import { asyncHandler } from "../utils/asyncHandlers.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.models.js";
import {
  uploadOnCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshtoken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while generating tokens"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // 1. Validate required fields
  const { fullname, email, username, password, phoneNumber } = req.body;

  const requiredFields = { fullname, email, username, password, phoneNumber };
  const missingFields = Object.entries(requiredFields)
    .filter(([_, value]) => !value?.trim())
    .map(([key]) => key);

  if (missingFields.length > 0) {
    throw new ApiError(
      400,
      `Missing required fields: ${missingFields.join(", ")}`
    );
  }

  // 2. Check for existing user
  const existedUser = await User.findOne({
    $or: [{ username }, { email }, { phoneNumber }],
  });

  if (existedUser) {
    let conflictField = "";
    if (existedUser.username === username) conflictField = "username";
    else if (existedUser.email === email) conflictField = "email";
    else if (existedUser.phoneNumber === phoneNumber)
      conflictField = "phone number";

    throw new ApiError(409, `User with this ${conflictField} already exists`);
  }

  // 3. Handle profile image upload
  let profileImage = {};
  if (req.file?.path) {
    try {
      const uploadedProfile = await uploadOnCloudinary(req.file.path);
      if (!uploadedProfile?.url) {
        throw new Error("Cloudinary upload failed");
      }
      profileImage = {
        url: uploadedProfile.url,
        public_id: uploadedProfile.public_id,
      };
    } catch (error) {
      console.error("Profile image upload error:", error);
      throw new ApiError(500, "Failed to upload profile image");
    }
  }

  // 4. Create user
  try {
    const user = await User.create({
      fullname,
      email,
      username: username.toLowerCase(),
      password,
      phoneNumber,
      profileImage: profileImage.url ? profileImage : undefined,
    });

    // 5. Get created user without sensitive data
    const createdUser = await User.findById(user._id).select(
      "-password -refreshtoken"
    );
    if (!createdUser) {
      // Clean up profile image if user creation failed after upload
      if (profileImage.public_id) {
        await deleteFromCloudinary(profileImage.public_id);
      }
      throw new Error("User document not found after creation");
    }

    // 6. Return success response
    return res
      .status(201)
      .json(new ApiResponse(201, createdUser, "User registered successfully"));
  } catch (error) {
    console.error("User registration error:", error);

    // Clean up uploaded profile image if error occurred
    if (profileImage.public_id) {
      try {
        await deleteFromCloudinary(profileImage.public_id);
      } catch (cleanupError) {
        console.error("Failed to cleanup profile image:", cleanupError);
      }
    }

    throw new ApiError(500, error.message || "User registration failed");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!(username || email)) {
    throw new ApiError(400, "username or email is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(401, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshtoken"
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshtoken: undefined,
      },
    },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "Invalid Refresh token");
    }

    if (incomingRefreshToken !== user?.refreshtoken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const options = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(user._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken: newRefreshToken },
          "Access token refreshed successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(currentPassword);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid Credentials");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const changeProfileImage = asyncHandler(async (req, res) => {
  const profileLocalPath = req.file?.path;
  if (!profileLocalPath) {
    throw new ApiError(400, "Profile image is required");
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  try {
    if (user.profileImage) {
      await deleteFromCloudinary(user.profileImage.public_id);
    }

    let profile;

    try {
      profile = await uploadOnCloudinary(profileLocalPath);
    } catch (error) {
      throw new ApiError(
        500,
        error?.message || "Something went wrong while uploading profile image"
      );
    }

    user.profileImage = {
      url: profile.url,
      public_id: profile.public_id,
    };

    await user.save({ validateBeforeSave: false });

    return res
      .status(200)
      .json(new ApiResponse(200, user, "Profile image updated successfully"));
  } catch (error) {
    throw new ApiError(
      500,
      error?.message || "Something went wrong while updating profile image"
    );
  }
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  changeProfileImage,
};
