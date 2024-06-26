const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const Products = require("../models/product.model");
const Brand = require("../models/brand.model");
const UploadImage = require("../utils/uploadConfig.utlis");
const favoriteModel = require("../models/favorite.model");
const cloudinary = require("cloudinary").v2;
class productsController {
  UpImage = UploadImage.array("images", 10);
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
      console.log(req.body);

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
  viewsProduct = catchAsync(async (req, res, next) => {
    try {
      const product = await Products.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Không tìm thấy sản phẩm" });
      }

      // Tăng số lượt xem của sản phẩm
      product.productViews += 1;
      await product.save();

      res.status(200).json({ message: "Đã tăng số lượt xem thành công" });
    } catch (error) {
      console.error("Lỗi khi tăng số lượt xem của sản phẩm:", error);
      res.status(500).json({ message: "Lỗi server" });
    }
  });
  createProduct = catchAsync(async (req, res, next) => {
    const category = await Category.findById(req.body.categoryId);
    const brand = await Brand.findById(req.body.brandId);
    if (!category) {
      return next(new appError("Không tìm thấy danh mục", 404));
    }
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
        })
        .populate({
          path: "Brand",
        }),
      req.query
    )
      .filter()
      .search()
      .sort()
      .paginate();
    const favorites = await favoriteModel.find({
      product: req.params.id,
      isFavorite: true,
    });
    const products = await features.query;
    return res.status(200).json({
      message: "success",
      data: products,
      favorites: favorites.length,
    });
  });
  getAllProducts = catchAsync(async (req, res, next) => {
    const pageSize = parseInt(req.query.limit) || 7;
    const currentPage = parseInt(req.query.page) || 1; // Trang hiện tại
    const isAvailable = req.query.isAvailable;
    const isOutofOrder = req.query.isOutofOrder;
    // Tạo điều kiện tìm kiếm dựa trên tham số truy vấn
    let queryConditions = {};
    if (isAvailable === undefined) {
      queryConditions.isAvailable = true;
    } else {
      queryConditions.isAvailable = isAvailable === "true";
    }

    if (isOutofOrder === undefined) {
      queryConditions.isOutofOrder = false;
    } else {
      queryConditions.isOutofOrder = isOutofOrder === "true";
    }
    console.log(queryConditions);
    const features = new ApiFeatures(
      Products.find(queryConditions)
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
      .sort();

    // Đếm tổng số kết quả trước khi phân trang
    const totalResults = await Products.countDocuments(features.query);
    const totalPages = Math.ceil(totalResults / pageSize);
    const products = await features.query
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);
    return res.status(200).json({
      message: "success",
      data: products,
      totalResults,
      totalPages,
      currentPage,
    });
  });
  getAllProductsbyCat = catchAsync(async (req, res, next) => {
    const nameCat = req.body.Category || req.query.Category;
    const category = await Category.findOne({ _id: nameCat });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    let queryConditions = { Category: category._id };
    const isAvailable = req.query.isAvailable;
    const isOutofOrder = req.query.isOutofOrder;
    if (isAvailable === undefined) {
      queryConditions.isAvailable = true;
    } else {
      queryConditions.isAvailable = isAvailable === "true";
    }

    if (isOutofOrder === undefined) {
      queryConditions.isOutofOrder = false;
    } else {
      queryConditions.isOutofOrder = isOutofOrder === "true";
    }

    const features = new ApiFeatures(
      Products.find(queryConditions)
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

    const totalResults = await Products.countDocuments(features.query);
    const pageSize = parseInt(req.query.limit) || 7; // Số sản phẩm mỗi trang
    const totalPages = Math.ceil(totalResults / pageSize);
    const products = await features.query;

    return res.status(200).json({
      message: "success",
      data: products,
      totalResults,
      totalPages,
      currentPage: parseInt(req.query.page) || 1,
    });
  });
  searchProducts = catchAsync(async (req, res, next) => {
    const { search, CategoryID, BrandID } = req.body;
    console.log(req.body);
    const isAvailable = req.query.isAvailable;
    const isOutofOrder = req.query.isOutofOrder;

    // Tạo điều kiện tìm kiếm dựa trên tham số truy vấn
    let queryConditions = {};
    if (isAvailable === undefined) {
      queryConditions.isAvailable = true;
    } else {
      queryConditions.isAvailable = isAvailable === "true";
    }

    if (isOutofOrder === undefined) {
      queryConditions.isOutofOrder = false;
    } else {
      queryConditions.isOutofOrder = isOutofOrder === "true";
    }

    let conditions = [queryConditions];
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

    const pageSize = parseInt(req.query.limit) || 7; // Số sản phẩm mỗi trang
    const currentPage = parseInt(req.query.page) || 1;

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
    const totalResults = await Products.countDocuments(query);
    const totalPages = Math.ceil(totalResults / pageSize);

    res.status(200).json({
      status: "success",
      results: products.length,
      totalResults,
      totalPages,
      currentPage,
      data: products,
    });
  });

  check = catchAsync(async (req, res, next) => {
    try {
      const vouchers = await Products.find();

      vouchers.forEach(async (voucher) => {
        if (voucher.quantity === 0) {
          voucher.isOutofOrder = true;
        }
        await voucher.save();
      });

      next();
    } catch (err) {
      next(err);
    }
  });
}

module.exports = new productsController();
