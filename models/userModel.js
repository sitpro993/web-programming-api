import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default:
        "https://res.cloudinary.com/beeyou/image/upload/v1641721299/logo/avatar7_jkzd2h.png",
    },

    phone: { type: String, default: "" },
    address: { type: Array, default: [] },
    totalOrders: { type: Number, default: 0 },
    totalAmountSpent: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

let Dataset = mongoose.models.user || mongoose.model("user", userSchema);
export default Dataset;
