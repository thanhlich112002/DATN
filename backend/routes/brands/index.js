const express = require("express");
const router = express.Router();
const BrandsController = require("../../controllers/brand.controller");

router
  .post(
    "/createBrand",
    BrandsController.updatePhoto,
    BrandsController.createBrand
  )
  .get("/getAllBrands", BrandsController.getAllBrands)
  .post("/seachBands", BrandsController.seachBrands)
  .put(
    "/updateBrand/:id",
    BrandsController.updatePhoto,
    BrandsController.updateBrand
  )
  .get("/getBrandById/:id", BrandsController.getBrandById);

module.exports = router;
