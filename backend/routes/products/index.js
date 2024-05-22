const express = require("express");
const router = express.Router();
const products = require("../../controllers/products.controller");
router.post("/addproduct", products.UpImage, products.createProduct);
router.get("/getProductsbyID/:id", products.getProductsbyID);
router.get("/getAllProducts", products.getAllProducts);
router.post("/searchProducts", products.searchProducts);
router.put("/updateProduct/:id", products.updateProduct);
router.post("/getAllProductsbyCat", products.getAllProductsbyCat);

module.exports = router;
