import express from "express";
import { addProduct, getProduct } from "../controller/product.js";
import upload from "../middleware/multerConfig.js";

const route = express.Router();

route.post("/add-product", upload.array("images", 5), addProduct);
route.get("/get-products", getProduct);

export default route;
