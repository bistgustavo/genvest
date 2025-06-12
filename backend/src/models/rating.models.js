import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    script: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Script",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    guestId: {
      type: String,
    },
    rating: {
      type: Number,
      min: 1,
      max: 10,
      required: true,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

// Compound indexes
ratingSchema.index(
  { script: 1, user: 1 },
  {
    unique: true,
    partialFilterExpression: { user: { $exists: true } },
  }
);

ratingSchema.index(
  { script: 1, guestId: 1 },
  {
    unique: true,
    partialFilterExpression: { guestId: { $exists: true } },
  }
);

export default mongoose.model("Rating", ratingSchema);
