import express from "express";
import { auth } from "../middleware/auth.js";
import Orders from "../models/orderModel.js";
import Products from "../models/productModel.js";
import Users from "../models/userModel.js";

const orderRouter = express.Router();

// /api/orders/delete

const sold = async (id, quantity, sold) => {
  console.log("item:", id, quantity, sold);
  await Products.findOneAndUpdate(
    { _id: id },
    {
      sold: sold + quantity,
    }
  );
};
// /api/orders/create
orderRouter.post("/create", async (req, res) => {
  try {
    const result = await auth(req, res);
    if (result.id) {
      const newOrder = new Orders({
        userId: result.id,
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

      req.body.cart.filter((item) => {
        console.log(item);
        return sold(item._id, item.quantity, item.sold);
      });

      res.json({
        msg: "Đơn hàng đã được tạo",
      });
    }
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/orders/:id/edit

// /api/orders/:id

// /api/orders/
orderRouter.get("/", async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

export default orderRouter;
