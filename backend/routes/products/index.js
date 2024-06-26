const express = require("express");
const router = express.Router();
const products = require("../../controllers/products.controller");

router.post("/addproduct", products.UpImage, products.createProduct);
router.get("/getProductsbyID/:id", products.check, products.getProductsbyID);
router.get("/getAllProducts", products.check, products.getAllProducts);
router.post("/searchProducts", products.check, products.searchProducts);
router.post(
  "/getAllProductsbyCat",
  products.check,
  products.getAllProductsbyCat
);
router.put("/:id", products.UpImage, products.updateProduct);
router.delete("/:id", products.deleteProduct);
router.post("/viewsProduct/:id", products.check, products.viewsProduct);
module.exports = router;
