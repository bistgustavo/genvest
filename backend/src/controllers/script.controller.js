import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Script } from "../models/script.model.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js";
import { Rating } from "../models/rating.model.js";

// Create a new script
const createScript = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    const userId = req.user._id;

    if (!title) {
        throw new ApiError(400, "Title is required");
    }

    const imageLocalPath = req.file?.path;
    let imageUrl;

    if (imageLocalPath) {
        try {
            const uploadedImage = await uploadOnCloudinary(imageLocalPath);
            imageUrl = uploadedImage?.url || "";
        } catch (error) {
            throw new ApiError(500, "Error uploading image");
        }
    }

    const script = await Script.create({
        user: userId,
        title,
        description: description || "",
        imageUrl: imageUrl || ""
    });

    if (!script) {
        throw new ApiError(500, "Failed to create script");
    }

    return res
        .status(201)
        .json(new ApiResponse(201, script, "Script created successfully"));
});

// Get all scripts with user details and average ratings
const getAllScripts = asyncHandler(async (req, res) => {
    const scripts = await Script.aggregate([
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "script",
                as: "ratings"
            }
        },
        {
            $addFields: {
                averageRating: { $avg: "$ratings.rating" },
                ratingCount: { $size: "$ratings" }
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                imageUrl: 1,
                createdAt: 1,
                updatedAt: 1,
                "user._id": 1,
                "user.username": 1,
                "user.fullname": 1,
                "user.profileImage": 1,
                averageRating: 1,
                ratingCount: 1
            }
        }
    ]);

    return res
        .status(200)
        .json(new ApiResponse(200, scripts, "Scripts retrieved successfully"));
});

// Get scripts by the logged-in user
const getMyScripts = asyncHandler(async (req, res) => {
    const userId = req.user._id;

    const scripts = await Script.find({ user: userId });

    return res
        .status(200)
        .json(new ApiResponse(200, scripts, "User scripts retrieved successfully"));
});

// Get a single script by ID with user details and ratings
const getScriptById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const script = await Script.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(id) }
        },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind: "$user"
        },
        {
            $lookup: {
                from: "ratings",
                localField: "_id",
                foreignField: "script",
                as: "ratings",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "user",
                            foreignField: "_id",
                            as: "user"
                        }
                    },
                    {
                        $unwind: "$user"
                    },
                    {
                        $project: {
                            rating: 1,
                            createdAt: 1,
                            "user._id": 1,
                            "user.username": 1,
                            "user.profileImage": 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                averageRating: { $avg: "$ratings.rating" },
                ratingCount: { $size: "$ratings" }
            }
        },
        {
            $project: {
                title: 1,
                description: 1,
                imageUrl: 1,
                createdAt: 1,
                updatedAt: 1,
                "user._id": 1,
                "user.username": 1,
                "user.fullname": 1,
                "user.profileImage": 1,
                ratings: 1,
                averageRating: 1,
                ratingCount: 1
            }
        }
    ]);

    if (!script || script.length === 0) {
        throw new ApiError(404, "Script not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, script[0], "Script retrieved successfully"));
});

// Update a script
const updateScript = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const userId = req.user._id;

    const script = await Script.findOne({ _id: id, user: userId });

    if (!script) {
        throw new ApiError(404, "Script not found or you don't have permission");
    }

    const imageLocalPath = req.file?.path;
    if (imageLocalPath) {
        try {
            // Delete old image if exists
            if (script.imageUrl) {
                await deleteFromCloudinary(script.imageUrl);
            }
            
            const uploadedImage = await uploadOnCloudinary(imageLocalPath);
            script.imageUrl = uploadedImage?.url || "";
        } catch (error) {
            throw new ApiError(500, "Error updating image");
        }
    }

    script.title = title || script.title;
    script.description = description || script.description;

    await script.save();

    return res
        .status(200)
        .json(new ApiResponse(200, script, "Script updated successfully"));
});

// Delete a script
const deleteScript = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    const script = await Script.findOneAndDelete({ _id: id, user: userId });

    if (!script) {
        throw new ApiError(404, "Script not found or you don't have permission");
    }

    // Delete associated ratings
    await Rating.deleteMany({ script: id });

    // Delete image from cloudinary if exists
    if (script.imageUrl) {
        await deleteFromCloudinary(script.imageUrl);
    }

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Script deleted successfully"));
});

export {
    createScript,
    getAllScripts,
    getMyScripts,
    getScriptById,
    updateScript,
    deleteScript
};