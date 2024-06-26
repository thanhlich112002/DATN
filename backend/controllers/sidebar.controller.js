const Sidebar = require("../models/sidebar.model");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");

class SidebarController {
  createSidebar = catchAsync(async (req, res) => {
    try {
      const name = req.body.name;
      const imagePath = req.file.path;
      await Sidebar.create({ img: imagePath, name: name });
      res.status(201).json({ message: "Tạo thành công" });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  getAllSidebar = catchAsync(async (req, res, next) => {
    const features = new ApiFeatures(Sidebar.find(), { isAvailable: true })
      .filter()
      .search()
      .sort();
    try {
      const totalResults = await Sidebar.countDocuments(features.query);
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
      return res.status(500).json({ message: "Lỗi server" });
    }
  });

  // Cập nhật trạng thái phiếu giảm giá
  updateSidebar = catchAsync(async (req, res) => {
    try {
      const id = req.params.id;
      const voucher = await Sidebar.findById(id);
      if (!voucher) {
        return res.status(404).json({ message: "" });
      }
      voucher.isAvailable = !voucher.isAvailable;
      const savedVoucher = await voucher.save();
      res.status(200).json(savedVoucher);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  updatePhoto = parser.single("images");
}

module.exports = new SidebarController();
