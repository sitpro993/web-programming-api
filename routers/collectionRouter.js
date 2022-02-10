import express from "express";
import Categories from "../models/categoryModel.js";
import Products from "../models/productModel.js";

const collectionRouter = express.Router();

// / api/collections/delete

// api/collections/create
collectionRouter.post("/create", async function (req, res) {
  try {
    const { title, slug } = req.body;

    const newCategory = new Categories({ title, slug });

    await newCategory.save();
    res.status(200).json({ success: "Tạo danh mục thành công" });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// api/collections/:slug/edit

// api/collections/:slug
collectionRouter.get("/:slug", async function (req, res) {
  try {
    const page = req.query.page > 1 ? req.query.page : 1;
    const limit = req.query.limit > 1 ? req.query.limit : 12;
    const skip = (page - 1) * limit;

    const sort_by = req.query.sort_by;
    let sortParams;

    if (sort_by == "best-selling") {
      sortParams = { sold: -1 };
    } else if (sort_by == "title-ascending") {
      sortParams = { title: 1 };
    } else if (sort_by == "title-descending") {
      sortParams = { title: -1 };
    } else if (sort_by == "price-ascending") {
      sortParams = { price: 1 };
    } else if (sort_by == "price-descending") {
      sortParams = { price: -1 };
    } else if (sort_by == "created-ascending") {
      sortParams = { createdAt: 1 };
    } else if (sort_by == "created-descending") {
      sortParams = { createdAt: -1 };
    } else {
      sortParams = { title: 1 };
    }
    const category = await Categories.findOne({
      slug: req.params.slug,
    });

    const products = await Products.find({
      checked: true,
      "category.slug": category.slug,
    }).sort(sortParams);

    res.json({
      category,
      products,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

// /api/collections/
collectionRouter.get("/", async function (req, res) {
  try {
    const categories = await Categories.find().select(["title", "_id", "slug"]);

    res.json({
      categories,
    });
  } catch (error) {
    return res.status(500).json({ err: error.message });
  }
});

export default collectionRouter;
