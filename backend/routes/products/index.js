const express = require("express");
const router = express.Router();
const products = require("../../controllers/products.controller");
router.post("/addproduct", products.createProduct);
router.get("/getProductsbyID/:id", products.getProductsbyID);

module.exports = router;
