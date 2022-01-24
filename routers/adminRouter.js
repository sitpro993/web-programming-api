import bcrypt from "bcryptjs";
import express from "express";
import AdminUsers from "../models/adminUserModel.js";
import { createToken } from "../utils/generateToken.js";

const adminRouter = express.Router();

const adminAcessToken = process.env.ADMIN_ACCESS_TOKEN_SECRET;
const adminRefreshToken = process.env.USER_REFRESH_TOKEN_SECRET;

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

// /api/admin/:id/edit

export default adminRouter;
