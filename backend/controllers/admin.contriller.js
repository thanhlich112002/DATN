const UserMode = require("../models/user.model");
const ProductMode = require("../models/product.model");
const OrderMode = require("../models/order.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");
const moment = require("moment");

class AdminController {
  getAllUser = catchAsync(async (req, res, next) => {
    try {
      const list = await UserMode.find();
      return res.status(200).json({ message: "success", data: list });
    } catch (err) {
      return res.status(400).json({ message: "fail", error: "lỗi server" });
    }
  });
  getQuantityUser = catchAsync(async (req, res, next) => {
    try {
      const listu = await UserMode.find({ role: "User" });
      const listp = await ProductMode.find({ status: { $ne: "Pending" } });
      const listo = await OrderMode.find();
      return res.status(200).json({
        message: "success",
        data: {
          user: listu.length,
          product: listp.length,
          order: listo.length,
        },
      });
    } catch (err) {
      return res.status(400).json({ message: "fail", error: "lỗi server" });
    }
  });
  getStatistics = catchAsync(async (req, res, next) => {
    try {
      const today = moment()
        .add(Number(process.env.UTC), "hours")
        .startOf("day")
        .add(1, "day") // Thêm 1 ngày vào ngày hiện tại
        .toDate();
      console.log(today);

      const startOfMonth = moment()
        .startOf("month")
        .add(process.env.UTC, "hours")
        .toDate();
      const orders = await OrderMode.find({
        dateOrdered: {
          $gte: startOfMonth,
          $lt: today,
        },
      });
      console.log(orders);
      const totalOrders = orders.length;
      let totalAmount = 0;
      orders.forEach((order) => {
        if (order.status != +"Pending") totalAmount += order.totalPrice;
      });
      res.status(200).json({
        success: true,
        totalOrders: totalOrders,
        totalAmount: totalAmount,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi thực hiện thống kê",
        error: error.message,
      });
    }
  });
  upStatus = catchAsync(async (req, res, next) => {
    try {
      const orders = await OrderMode.findById(req.params.orderId);
      const { notification, status } = req.body; // Sửa từ noti thành notification
      console.log(notification, status);
      orders.status = status;
      if (notification) {
        orders.notification = notification; // Sửa từ noti thành notification
      }
      await orders.save();
      return res.status(200).json({
        success: true,
        message: "Đã cập nhật trạng thái đơn hàng thành công",
        newStatus: orders.status,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi cập nhật trạng thái đơn hàng",
        error: error.message,
      });
    }
  });
}

module.exports = new AdminController();
