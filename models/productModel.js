import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },

    shortDescription: {
      type: String,
    },
    variant: {
      type: Array,
      required: true,
    },
    size: { type: Array },
    category: {
      type: Array,
      required: true,
    },
    checked: {
      type: Boolean,
      default: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },

  { timestamps: true }
);

let Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;
