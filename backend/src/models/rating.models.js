import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema(
  {
    script: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Script",
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    rating: { type: Number, min: 1, max: 10, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Rating", ratingSchema);
