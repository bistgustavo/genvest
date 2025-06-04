import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Rating } from "../models/rating.model.js";
import { Script } from "../models/script.model.js";

// Add or update a rating
const addOrUpdateRating = asyncHandler(async (req, res) => {
  const { scriptId, rating } = req.body;
  const userId = req.user._id;

  if (!scriptId || !rating) {
    throw new ApiError(400, "Script ID and rating are required");
  }

  if (rating < 1 || rating > 10) {
    throw new ApiError(400, "Rating must be between 1 and 10");
  }

  const script = await Script.findById(scriptId);
  if (!script) {
    throw new ApiError(404, "Script not found");
  }

  // Check if user already rated this script
  let existingRating = await Rating.findOne({
    script: scriptId,
    user: userId,
  });

  if (existingRating) {
    // Update existing rating
    existingRating.rating = rating;
    await existingRating.save();
  } else {
    // Create new rating
    existingRating = await Rating.create({
      script: scriptId,
      user: userId,
      rating,
    });
  }

  // Calculate new average rating for the script
  const ratings = await Rating.find({ script: scriptId });
  const totalRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalRatings / ratings.length;

  // Update script with average rating
  script.averageRating = averageRating;
  script.ratingCount = ratings.length;
  await script.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, existingRating, "Rating added/updated successfully")
    );
});

// Get user's rating for a script
const getUserRating = asyncHandler(async (req, res) => {
  const { scriptId } = req.params;
  const userId = req.user._id;

  const rating = await Rating.findOne({
    script: scriptId,
    user: userId,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, rating || {}, "Rating retrieved successfully"));
});

// Get all ratings for a script
const getScriptRatings = asyncHandler(async (req, res) => {
  const { scriptId } = req.params;

  const ratings = await Rating.aggregate([
    {
      $match: { script: new mongoose.Types.ObjectId(scriptId) },
    },
    {
      $lookup: {
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $unwind: "$user",
    },
    {
      $project: {
        rating: 1,
        createdAt: 1,
        "user._id": 1,
        "user.username": 1,
        "user.profileImage": 1,
      },
    },
    {
      $sort: { createdAt: -1 },
    },
  ]);

  return res
    .status(200)
    .json(
      new ApiResponse(200, ratings, "Script ratings retrieved successfully")
    );
});

// Delete a rating
const deleteRating = asyncHandler(async (req, res) => {
  const { ratingId } = req.params;
  const userId = req.user._id;

  const rating = await Rating.findOneAndDelete({
    _id: ratingId,
    user: userId,
  });

  if (!rating) {
    throw new ApiError(404, "Rating not found or you don't have permission");
  }

  // Recalculate average rating for the script
  const script = await Script.findById(rating.script);
  const ratings = await Rating.find({ script: rating.script });

  if (ratings.length > 0) {
    const totalRatings = ratings.reduce((sum, r) => sum + r.rating, 0);
    script.averageRating = totalRatings / ratings.length;
    script.ratingCount = ratings.length;
  } else {
    script.averageRating = 0;
    script.ratingCount = 0;
  }

  await script.save();

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Rating deleted successfully"));
});

export { addOrUpdateRating, getUserRating, getScriptRatings, deleteRating };
