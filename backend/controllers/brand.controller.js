const Brand = require("../models/brand.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");

class BrandController {
  createCategory = catchAsync(async (req, res, next) => {
    const cat = await Brand.findOne({ name: req.body.name });
    if (cat) {
      return res.status(409).json({
        message: "Danh mục đã tồn tại",
      });
    }

    const doc = await Brand.create(req.body);
    res.status(200).json({
      data: doc,
    });
  });
  getAllBrand = catchAsync(async (req, res, next) => {
    const cat = await Brand.find();
    return res.status(200).json({ message: "success", data: cat });
  });
  seachBrands = catchAsync(async (req, res, next) => {
    try {
      console.log(req.body)
      const nameBrand = req.body.nameBrand;
      if (!nameBrand) {
        return res.status(400).json({ message: "Brand name is required" });
      }
      const brand = await Brand.find({ name: new RegExp(nameBrand, "i") });
      console.log(brand);
      return res.status(200).json({ message: "success", data: brand });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  });
}

module.exports = new BrandController();
