const express = require("express");
const router = express.Router();
const CategoryController = require("../../controllers/categorys.controller");

router
  .post(
    "/createCategory",
    CategoryController.updatePhoto,
    CategoryController.createCategory
  )
  .put(
    "/updateCategory/:id",
    CategoryController.updatePhoto,
    CategoryController.updateCategory
  )
  .get("/getCategoryById/:id", CategoryController.getCategoryById)
  .get("/getAllCategory", CategoryController.getAllCategory);

module.exports = router;
