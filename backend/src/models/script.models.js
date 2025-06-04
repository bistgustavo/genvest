import mongoose from "mongoose";

const scriptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    imageUrl: { type: String }, // You can store a URL or local file path
    description: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Script", scriptSchema);
