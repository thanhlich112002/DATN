const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const Products = require("../models/product.model");
const Brand = require("../models/brand.model");

class productsController {
  createProduct = catchAsync(async (req, res, next) => {
    const category = await Category.findOne({ name: req.body.category });
    console.log(category);
    if (!category) {
      return next(new appError("Không tím thấy danh mục ", 404));
    }
    const brand = await Brand.findOne({ name: req.body.brand });
    if (!brand) {
      return next(new appError("Không tím thấy nhãn hiệu", 404));
    }
    req.body.categoryId = category._id;
    req.body.brandId = brand._id;
    const product = await Products.create(req.body);
    return res.status(200).json(product);
  });
  getProductsbyID = catchAsync(async (req, res, next) => {
    const product = await Products.findOne({ _id: req.params.id })
      .populate({
        path: "categoryId",
        select: "name",
      })
      .populate({
        path: "brandId",
        select: "name",
      });
    return res.status(200).json({ message: "success", data: product });
  });
}
module.exports = new productsController();
