import express from "express";
import Products from "../models/productModel.js";

const productRouter = express.Router();

// /api/products/:slug
productRouter.get("/admin/:slug", async (req, res) => {
  try {
    const product = await Products.findOne({
      slug: req.params.slug,
      isDeleted: false,
    });
    if (!product)
      return res.status(400).json({ err: "This product does not exist." });
    res.json({ product });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/delete
productRouter.delete("/delete", async (req, res) => {
  try {
    const productIds = req.body.productIds;
    const data = await Products.updateMany(
      { _id: { $in: productIds } },
      { isDeleted: true, deletedAt: new Date(), checked: false }
    );

    if (data.modifiedCount > 0)
      return res
        .status(200)
        .json({ success: `Đã xóa ${data.modifiedCount} sản phẩm` });
    if (data.modifiedCount <= 0)
      return res.status(400).json({ err: "Xóa thất bại" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/destroy
productRouter.delete("/destroy", async (req, res) => {
  try {
    const productIds = req.body.productIds;
    const data = await Products.deleteMany({ _id: { $in: productIds } });

    if (data.deletedCount > 0)
      return res
        .status(200)
        .json({ success: `Đã xóa ${data.deletedCount} sản phẩm` });
    if (data.deletedCount <= 0)
      return res.status(400).json({ err: "Xóa thất bại" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/restore
productRouter.patch("/restore", async (req, res) => {
  try {
    const productIds = req.body.productIds;
    const data = await Products.updateMany(
      { _id: { $in: productIds } },
      { isDeleted: false, deletedAt: null }
    );

    if (data.modifiedCount > 0)
      return res
        .status(200)
        .json({ success: `Đã khôi phục ${data.modifiedCount} sản phẩm` });
    if (data.modifiedCount <= 0)
      return res.status(400).json({ err: "Khôi phục thất bại" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/active
productRouter.patch("/active", async (req, res) => {
  try {
    const productIds = req.body.productIds;
    const data = await Products.updateMany(
      { _id: { $in: productIds } },
      { checked: true }
    );
    if (data)
      return res
        .status(200)
        .json({ success: `Đã kích hoạt ${data.modifiedCount} sản phẩm.` });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/nonActive
productRouter.patch("/nonActive", async (req, res) => {
  try {
    const productIds = req.body.productIds;
    const data = await Products.updateMany(
      { _id: { $in: productIds } },
      { checked: false }
    );
    if (data)
      return res
        .status(200)
        .json({ success: `Đã ẩn ${data.modifiedCount} sản phẩm.` });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/create
productRouter.post("/create", async (req, res) => {
  try {
    const product = req.body.product;

    const newProduct = new Products({
      title: product.title,
      slug: product.slug,
      price: product.price,
      description: product.description,
      shortDescription: product.shortDescription,
      variant: product.variant,
      size: product.size,
      category: product.category,
      tag: product.tag,
      checked: product.checked,
    });

    await newProduct.save();
    return res.status(200).json({ success: "Tạo sản phẩm thành công" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/edit
productRouter.patch("/edit", async (req, res) => {
  try {
    const product = req.body.product;

    const data = await Products.findByIdAndUpdate(product._id, {
      title: product.title,
      slug: product.slug,
      price: product.price,
      description: product.description,
      shortDescription: product.shortDescription,
      variant: product.variant,
      size: product.size,
      category: product.category,
      tag: product.tag,
      checked: product.checked,
    });
    return res.status(200).json({ success: "Chỉnh sửa sản phẩm thành công" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});
// api/products/trash
productRouter.get("/trash", async (req, res) => {
  try {
    const products = await Products.find({ isDeleted: true });

    res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/products/hot
productRouter.get("/hot", async (req, res) => {
  try {
    const products = await Products.find({ checked: true })
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
    const products = await Products.find({ checked: true })
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
    const product = await Products.findOne({
      slug: req.params.slug,
      checked: true,
    });
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
    const products = await Products.find({ isDeleted: false });

    res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

export default productRouter;
