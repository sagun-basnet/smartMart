import express from "express";
import {
  addProduct,
  getProduct,
  getProductByCategory,
  getProductById,
} from "../controller/product.js";
import upload from "../middleware/multerConfig.js";

const route = express.Router();

route.post("/add-product", upload.array("images", 5), addProduct);
route.get("/get-products", getProduct);
route.get("/get-products-by-category", getProductByCategory);
route.get("/get-products-by-id/:id", getProductById);

export default route;
