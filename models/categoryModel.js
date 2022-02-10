import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: { type: String, required: true },
  },
  { timestamps: true }
);

let Dataset =
  mongoose.models.category || mongoose.model("category", categorySchema);
export default Dataset;
