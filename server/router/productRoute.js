import express from "express";
import {
  addProduct,
  getProduct,
  getProductByCategory,
  getProductById,
  editProduct,
} from "../controller/product.js";
import upload from "../middleware/multerConfig.js";

const route = express.Router();

route.post("/add-product", upload.array("images", 5), addProduct);
route.get("/get-products", getProduct);
route.get("/get-products-by-category", getProductByCategory);
route.get("/get-products-by-id/:id", getProductById);
route.post("/update-product/:id", editProduct);

export default route;
