import bcrypt from "bcryptjs";
import express from "express";
import AdminUsers from "../models/adminUserModel.js";
import Users from "../models/userModel.js";
import Products from "../models/productModel.js";
import Orders from "../models/orderModel.js";
import { createToken } from "../utils/generateToken.js";

const adminRouter = express.Router();

const adminAcessToken = process.env.ADMIN_ACCESS_TOKEN_SECRET;
const adminRefreshToken = process.env.USER_REFRESH_TOKEN_SECRET;

adminRouter.get("/accessToken", async (req, res) => {
  try {
    const rf_token = req.headers.authorization;

    if (!rf_token) return res.status(400).json({ err: "Please login now!" });

    const result = jwt.verify(rf_token, adminRefreshToken);

    if (!result)
      return res
        .status(400)
        .json({ err: "Your token is incorrect or has expired." });

    const user = await Users.findById(result.id);
    if (!user) return res.status(400).json({ err: "User does not exist." });

    const access_token = createToken({ id: user._id }, userAcessToken, "30d");
    res.json({
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});
// api/admin/signin
adminRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AdminUsers.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ err: "Tài khoản không tồn tại.", errCode: 1 });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ err: "Mật khẩu không đúng.", errCode: 2 });

    const access_token = createToken({ id: user._id }, adminAcessToken, "30d");
    const refresh_token = createToken(
      { id: user._id },
      adminRefreshToken,
      "365d"
    );

    res.json({
      msg: "Chào, " + user.firstName + " quay trở lại",
      refresh_token,
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

//api/admin/statistical
adminRouter.get("/statistical", async (req, res) => {
  const countUser = await Users.count();
  const countProduct = await Products.count();
  const countOrder = await Orders.count();
  const orders = await Orders.find({ isDelivered: true, isPaid: true }).select([
    "totalPrice",
    "-_id",
    "shippingPrice",
  ]);
  const totalIncome = orders.reduce((prev, item) => {
    return prev + (item.totalPrice - item.shippingPrice);
  }, 0);

  res.json({ countOrder, countProduct, countUser, totalIncome });
});

// /api/admin/:id/edit

export default adminRouter;
