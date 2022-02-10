import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    slug: { type: String, required: true, unique: true },
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
      type: Object,
      required: true,
    },
    tag: { type: Array },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },

  { timestamps: true }
);

let Dataset =
  mongoose.models.product || mongoose.model("product", productSchema);
export default Dataset;
