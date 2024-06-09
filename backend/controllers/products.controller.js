const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const Products = require("../models/product.model");
const Brand = require("../models/brand.model");
const UploadImage = require("../utils/uploadConfig.utlis");
const cloudinary = require("cloudinary").v2;

class productsController {
  UpImage = UploadImage.array("images", 10);

  createProduct = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.body.categoryId);
    const brand = await Brand.findById(req.body.brandId);

    // Kiểm tra xem danh mục có tồn tại không
    if (!category) {
      return next(new appError("Không tìm thấy danh mục", 404));
    }

    // Kiểm tra xem nhãn hiệu có tồn tại không
    if (!brand) {
      return next(new appError("Không tìm thấy nhãn hiệu", 404));
    }
    if (!req.files) return next(new appError("Vui longf theem anhe", 404));
    console.log(req.files);
    req.body.Category = category._id;
    req.body.Brand = brand._id;
    req.body.images = req.files.map((file) => file.path);
    const product = await Products.create(req.body);
    return res.status(200).json(product);
  });
  getProductsbyID = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(
      Products.findOne({ _id: req.params.id })
        .populate({
          path: "Category",
          select: "name",
        })
        .populate({
          path: "Brand",
          select: "name",
        }),
      req.query
    )
      .filter()
      .search()
      .sort()
      // .limitFields()
      .paginate();
    const products = await features.query;
    return res.status(200).json({ message: "success", data: products });
  });
  getAllProducts = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(
      Products.find()
        .populate({
          path: "Category",
          select: "name",
        })
        .populate({
          path: "Brand",
          select: "name",
        }),
      req.query
    )
      .filter()
      .search()
      .sort()
      // .limitFields()
      .paginate();
    const products = await features.query;
    return res.status(200).json({ message: "success", data: products });
  });

  getAllProductsbyCat = catchAsync(async (req, res, next) => {
    const nameCat = req.body.Category || req.query.Category;
    const category = await Category.findOne({ name: nameCat });
    const features = new ApiFeatures(
      Products.find({ Category: category._id })
        .populate({
          path: "Category",
          select: "name",
        })
        .populate({
          path: "Brand",
          select: "name",
        }),
      req.query
    )
      .filter()
      .search()
      .sort()
      .paginate();
    const products = await features.query;
    return res.status(200).json({ message: "success", data: products });
  });
  searchProducts = catchAsync(async (req, res, next) => {
    const { search, CategoryID, BrandID } = req.body;
    console.log(req.body);
    let conditions = [];

    if (search) {
      conditions.push({ name: { $regex: search, $options: "i" } });
    }

    if (CategoryID && CategoryID.length > 0) {
      conditions.push({ Category: { $in: CategoryID } });
    }

    if (BrandID && BrandID.length > 0) {
      conditions.push({ Brand: { $in: BrandID } });
    }

    const query = conditions.length > 0 ? { $and: conditions } : {};
    console.log(query);
    const features = new ApiFeatures(
      Products.find(query)
        .populate({
          path: "Category",
          select: "name",
        })
        .populate({
          path: "Brand",
          select: "name",
        }),
      req.query
    )
      .filter()
      .search()
      .sort()
      .paginate();

    const products = await features.query;

    res.status(200).json({
      status: "success",
      results: products.length,
      data: products,
    });
  });
  updateProduct = catchAsync(async (req, res, next) => {
    try {
      console.log(req.body.categoryId);

      const category = await Category.findById(req.body.categoryId);
      const brand = await Brand.findById(req.body.brandId);

      if (!category) {
        return next(new appError("Không tìm thấy danh mục", 404));
      }

      if (!brand) {
        return next(new appError("Không tìm thấy nhãn hiệu", 404));
      }

      req.body.Brand = brand._id;
      req.body.Category = category._id;
      let body = req.body;
      let product = await Products.findById(req.params.id);

      if (!product) {
        return next(new appError("Không thể tìm thấy sản phẩm", 404));
      }

      let images = [...product.images];
      let dels = req.body.dels;

      if (dels) {
        images = images.filter((el) => !dels.includes(el));
      }

      if (req.files) {
        images = images.concat(req.files.map((file) => file.path));
      }

      body.images = images;

      const updatedProduct = await Products.findByIdAndUpdate(
        req.params.id,
        body,
        {
          new: true,
          runValidators: true,
        }
      );

      if (dels) {
        for (let i = 0; i < dels.length; i++) {
          let parts = dels[i].split("/");
          let id =
            parts.slice(parts.length - 2, parts.length - 1).join("/") +
            "/" +
            parts[parts.length - 1].split(".")[0];
          console.log(id);
          cloudinary.uploader.destroy(id);
        }
      }

      res.status(200).json({
        status: "success",
        data: updatedProduct,
      });
    } catch (err) {
      next(err);
    }
  });

  deleteProduct = catchAsync(async (req, res, next) => {
    const product = await Products.findByIdAndDelete({ _id: req.params.id });
    if (!product) {
      return next(new appError("Không thể tìm thấy sản phẩm", 404));
    }
    product.images.forEach((links) => {
      let parts = links.split("/");
      let id =
        parts.slice(parts.length - 2, parts.length - 1).join("/") +
        "/" +
        parts[parts.length - 1].split(".")[0];
      cloudinary.uploader.destroy(id);
    });

    res.status(200).json("Đã xoá thành công");
  });
}
module.exports = new productsController();
