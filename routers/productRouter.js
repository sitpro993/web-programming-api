import express from "express";
import Products from "../models/productModel.js";

const productRouter = express.Router();

// api/products/delete

// api/products/create

// api/products/:slug/edit

// /api/products/:slug
productRouter.get("/:slug", async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug });
    if (!product)
      return res.status(400).json({ err: "This product does not exist." });
    res.json({ product });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

// /api/products/
productRouter.get("/", async (req, res) => {
  try {
    const products = await Products.find({});

    res.json({
      products,
    });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
});

export default productRouter;
