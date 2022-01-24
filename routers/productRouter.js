import express from "express";
import Products from "../models/productModel.js";

const productRouter = express.Router();

// api/products/delete

// api/products/create

// api/products/:slug/edit

// api/products/hot
productRouter.get("/hot", async (req, res) => {
  try {
    const products = await Products.find({})
      .limit(req.query.limit)
      .sort("-sold");
    res.json(products);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/newProduct
productRouter.get("/newProduct", async (req, res) => {
  try {
    const products = await Products.find({})
      .limit(req.query.limit)
      .sort("-createdAt");
    res.json(products);
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/products/:slug
productRouter.get("/:slug", async (req, res) => {
  try {
    const product = await Products.findOne({ slug: req.params.slug });
    if (!product)
      return res.status(400).json({ err: "This product does not exist." });
    res.json({ product });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/products/
productRouter.get("/", async (req, res) => {
  try {
    const products = await Products.find({});

    res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

export default productRouter;
