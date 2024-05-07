const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");

class categoryController {
  creatCategory = catchAsync(async (req, res, next) => {
    const body = req.body;
    const category = await Category.findOne({ name: body.name });
    if (category) {
      return next(new Error("Danh mục đã tồn tại"));
    }
    const cat = await Category.create(body);
    return res.status(200).json(cat);
  });
}
module.exports = new categoryController();
