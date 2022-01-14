import express from "express";
import { auth } from "../middleware/auth.js";
import Orders from "../models/orderModel.js";
import Users from "../models/userModel.js";

const orderRouter = express.Router();

// /api/orders/delete

// /api/orders/create
orderRouter.post("/create", async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const user = await Users.findById(result.id);

      if (user._id) {
        const newOrder = new Orders({
          userId: user._id,
          name: req.body.name,
          address: req.body.address,
          phone: req.body.phone,
          cart: req.body.cart,
          shippingPrice: req.body.shippingPrice,
          totalPrice: req.body.totalPrice,
          //payMethod: req.body.payMethod,
          deliveryMethod: req.body.deliveryMethod,
        });
        await newOrder.save();

        
        res.json({
          msg: "Đơn hàng đã được tạo",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/orders/:id/edit

// /api/orders/:id

// /api/orders/

export default orderRouter;
