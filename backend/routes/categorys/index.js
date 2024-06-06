const express = require("express");
const router = express.Router();
const CategoryController = require("../../controllers/categorys.controller");

router
  .post(
    "/createCategory",
    CategoryController.updatePhoto,
    CategoryController.createCategory
  )
  .get("/getCategoryById/:id", CategoryController.getCategoryById)
  .get("/getAllCategory", CategoryController.getAllCategory);

module.exports = router;
