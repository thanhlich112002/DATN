const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");
const cloudinary = require("cloudinary").v2;

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
  updateCategory = catchAsync(async (req, res, next) => {
    try {
      const categoryId = req.params.id;
      const category = await Category.findById(categoryId);

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

      const updatedCategory = await Category.findByIdAndUpdate(
        categoryId,
        body,
        {
          new: true,
          runValidators: true,
        }
      );

      res.status(200).json({
        status: "success",
        data: updatedCategory,
      });
    } catch (err) {
      next(err);
    }
  });

  updatePhoto = parser.single("images");
}

module.exports = new CategoryController();
