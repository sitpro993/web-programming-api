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
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
    totalProduct: { type: Number, required: true },
  },
  { timestamps: true }
);

categorySchema.pre("validate", function (next) {
  this.totalProduct = this.product.length;
  next();
});

let Dataset =
  mongoose.models.category || mongoose.model("category", categorySchema);
export default Dataset;
