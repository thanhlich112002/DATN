const Brand = require("../models/brand.model");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");
const cloudinary = require("cloudinary").v2;

class BrandController {
  createBrand = catchAsync(async (req, res, next) => {
    const cat = await Brand.findOne({ name: req.body.name });
    if (cat) {
      return res.status(409).json({
        message: "Chi nhánh đã tồn tại",
      });
    }
    const imagePath = req.file.path;
    const categoryData = {
      ...req.body,
      images: imagePath,
    };
    const doc = await Brand.create(categoryData);
    res.status(200).json({
      data: doc,
    });
  });
  getBrandById = catchAsync(async (req, res, next) => {
    const categoryId = req.params.id;
    console.log(categoryId);
    const cat = await Brand.findById(categoryId);
    console.log(cat);
    if (!cat) {
      return res.status(404).json({ message: "Không tìm thấy thương hiệu" });
    }
    return res.status(200).json({ message: "success", data: cat });
  });
  updateBrand = catchAsync(async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const category = await Brand.findById(categoryId);

      if (!category) {
        return next(new appError("Không tìm thấy danh mục", 404));
      }

      const imagePath = req.file?.path;
      let { del, ...body } = req.body;
      let images = category.images;

      if (del) {
        del = Array.isArray(del) ? del : [del];
        images = images.filter((el) => !del.includes(el));
        // Xóa ảnh từ Cloudinary nếu có yêu cầu xóa
        for (let i = 0; i < del.length; i++) {
          let parts = del[i].split("/");
          let id =
            parts.slice(parts.length - 2, parts.length - 1).join("/") +
            "/" +
            parts[parts.length - 1].split(".")[0];
          console.log(id);
          await cloudinary.uploader.destroy(id);
        }
      }
      if (imagePath) {
        images = imagePath; // Cập nhật đường dẫn ảnh mới
      }
      body.images = images;
      const updatedCategory = await Brand.findByIdAndUpdate(categoryId, body, {
        new: true,
        runValidators: true,
      });
      res.status(200).json({
        status: "success",
        data: updatedCategory,
      });
    } catch (err) {
      next(err);
    }
  });
  getAllBrands = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Brand.find(), req.query)
      .filter()
      .search()
      .sort();
    const totalResults = await Brand.countDocuments(features.query);
    const pageSize = parseInt(req.query.limit) || 7;
    const totalPages = Math.ceil(totalResults / pageSize);
    const currentPage = parseInt(req.query.page) || 1;
    const cate = await features.query
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    return res.status(200).json({
      message: "Thành công",
      data: cate,
      totalResults,
      totalPages,
      currentPage,
    });
  });

  seachBrands = catchAsync(async (req, res, next) => {
    try {
      const nameBrand = req.body.nameBrand;
      const features = new ApiFeatures(
        Brand.find({ name: new RegExp(nameBrand, "i") }),
        req.query
      )
        .filter()
        .search()
        .sort();
      const totalResults = await Brand.countDocuments(features.query);
      const pageSize = parseInt(req.query.limit) || 7;
      const totalPages = Math.ceil(totalResults / pageSize);
      const currentPage = parseInt(req.query.page) || 1;
      const cate = await features.query
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize);
      return res.status(200).json({
        message: "Thành công",
        data: cate,
        totalResults,
        totalPages,
        currentPage,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Lỗi máy chủ" });
    }
  });

  updatePhoto = parser.single("images");
}

module.exports = new BrandController();
