const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");

class CategoryController {
  createCategory = catchAsync(async (req, res, next) => {
    const cat = await Category.findOne({ name: req.body.name });
    if (cat) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }
    console.log(req.file);
    const imagePath = req.file.path;
    const categoryData = {
      ...req.body,
      images: imagePath,
    };

    const doc = await Category.create(categoryData);
    res.status(200).json({
      data: doc,
    });
  });
  getCategoryById = catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    const cat = await Category.findById(categoryId);
    console.log(cat);
    if (!cat) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ message: "success", data: cat });
  });
  getAllCategory = catchAsync(async (req, res, next) => {
    const cat = await Category.find();
    console.log(cat);
    return res.status(200).json({ message: "success", data: cat });
  });

  updatePhoto = parser.single("images");
}

module.exports = new CategoryController();
