import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: Object, required: true },
    phone: { type: String, required: true },
    cart: { type: Array, required: true },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    //payMethod: { type: String, required: true },
    isDelivered: { type: Boolean, default: false },
    isPaid: { type: Boolean, default: false },
    deliveryMethod: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.order || mongoose.model("order", orderSchema);
export default Dataset;
