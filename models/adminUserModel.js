import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
  }
);

let Dataset =
  mongoose.models.adminUser || mongoose.model("adminUser", adminUserSchema);
export default Dataset;
