const Category = require("../models/category.model");
const appError = require("../utils/appError.utlis");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const Products = require("../models/product.model");
const Brand = require("../models/brand.model");
const UploadImage = require("../utils/uploadConfig.utlis");

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
      const id = req.params.id;
      const { name, price, description } = req.body;

      // Tìm sản phẩm theo id
      const product = await Products.findById(id);
      if (!product) {
        return res.status(404).json({ message: "Sản phẩm không tồn tại" });
      }
      const category = await Category.findOne({ name: req.body.category });
      if (!category) {
        return next(new appError("Không tím thấy danh mục ", 404));
      }
      const brand = await Brand.findOne({ name: req.body.brand });
      if (!brand) {
        return next(new appError("Không tím thấy nhãn hiệu", 404));
      }
      product.categoryId = category._id;
      product.brandId = brand._id;

      // Cập nhật thông tin sản phẩm
      product.name = name;
      product.price = price;
      product.description = description;

      // Lưu sản phẩm đã được cập nhật vào cơ sở dữ liệu
      const updatedProduct = await product.save();

      // Trả về phản hồi thành công
      return res
        .status(200)
        .json({ message: "Sản phẩm đã được cập nhật", data: updatedProduct });
    } catch (error) {
      // Xử lý lỗi nếu có
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi cập nhật sản phẩm",
        error: error.message,
      });
    }
  });
}
module.exports = new productsController();
