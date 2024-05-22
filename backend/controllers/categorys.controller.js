const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");

class CategoryController {
  createCategory = catchAsync(async (req, res, next) => {
    const cat = await Category.findOne({ name: req.body.name });

    // Kiểm tra xem danh mục đã tồn tại hay không
    if (cat) {
      return res.status(409).json({
        message: "Category already exists",
      });
    }
    const imagePath = req.file.path;
    const categoryData = {
      ...req.body,
      images: imagePath,
    };

    const doc = await Category.create(categoryData);

    // Trả về kết quả
    res.status(200).json({
      data: doc,
    });
  });
  getAllCategory = catchAsync(async (req, res, next) => {
    const cat = await Category.find();
    console.log(cat);
    return res.status(200).json({ message: "success", data: cat });
  });

  updatePhoto = parser.single("images");
}

module.exports = new CategoryController();
