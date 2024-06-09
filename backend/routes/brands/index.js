const express = require("express");
const router = express.Router();
const BrandsController = require("../../controllers/brand.controller");

router
  .post("/createCategory", BrandsController.createCategory)
  .get("/getAllBrand", BrandsController.getAllBrand)
  .post("/seachBands", BrandsController.seachBrands);

module.exports = router;
