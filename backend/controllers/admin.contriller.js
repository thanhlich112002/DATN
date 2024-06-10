const UserMode = require("../models/user.model");
const ProductMode = require("../models/product.model");
const OrderMode = require("../models/order.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");
const moment = require("moment");
const categoryMode = require("../models/category.model");
const brandMode = require("../models/brand.model");

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
      let listo = 1;
      const time = req.params.time;
      if (time === "day") {
        const today = moment()
          .add(Number(process.env.UTC), "hours")
          .startOf("day")
          .add(1, "day")
          .toDate();

        const startOfMonth = moment()
          .startOf("day")
          .add(process.env.UTC, "hours")
          .toDate();
        const orders = await OrderMode.find({
          dateOrdered: {
            $gte: startOfMonth,
            $lt: today,
          },
        });
        console.log(orders);
        listo = orders.length;
      }
      if (time === "month") {
        const today = moment()
          .add(Number(process.env.UTC), "hours")
          .startOf("day")
          .add(1, "day")
          .toDate();

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
        listo = orders.length;
      }
      if (time === "year") {
        const today = moment()
          .add(Number(process.env.UTC), "hours")
          .startOf("day")
          .add(1, "day")
          .toDate();

        const startOfMonth = moment()
          .startOf("year")
          .add(process.env.UTC, "hours")
          .toDate();
        const orders = await OrderMode.find({
          dateOrdered: {
            $gte: startOfMonth,
            $lt: today,
          },
        });
        console.log(orders);
        listo = orders.length;
      }
      const listu = await UserMode.find({ role: "User" });
      const listp = await ProductMode.find({ status: { $ne: "Pending" } });
      return res.status(200).json({
        message: "success",
        data: {
          user: listu.length,
          product: listp.length,
          order: listo,
        },
      });
    } catch (err) {
      return res.status(400).json({ message: "fail", error: "lỗi server" });
    }
  });
  getOrderCount = catchAsync(async (req, res, next) => {
    try {
      const time = req.params.time;
      let startDate, endDate, dateFormat, incrementUnit;
      switch (time) {
        case "day":
          startDate = moment()
            .startOf("day")
            .add(Number(process.env.UTC), "hours")
            .toDate();
          endDate = moment(startDate).add(1, "day").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "week":
          startDate = moment()
            .startOf("week")
            .add(Number(process.env.UTC), "hours")
            .toDate();
          endDate = moment(startDate).add(1, "week").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "month":
          startDate = moment().startOf("month").toDate();
          endDate = moment(startDate).add(1, "month").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "year":
          startDate = moment().startOf("year").toDate();
          endDate = moment(startDate).add(1, "year").toDate();
          dateFormat = "YYYY-MM";
          incrementUnit = "month";
          break;
        default:
          return res.status(400).json({ message: "Invalid time parameter" });
      }
      console.log(startDate, endDate);
      const orders = await OrderMode.find({
        dateOrdered: {
          $gte: startDate,
          $lt: endDate,
        },
      });
      console.log(orders);
      const statsByTime = {};
      const timeUnits = [];
      let currentTime = moment(startDate);

      while (currentTime.isBefore(endDate)) {
        const times = currentTime.format(dateFormat);
        timeUnits.push(times);
        statsByTime[times] = { value: 0, totalRevenue: 0 };
        currentTime.add(1, incrementUnit);
      }
      console.log(currentTime);

      orders.forEach((order) => {
        const date = moment(order.dateOrdered)
          .subtract(Number(process.env.UTC), "hours")
          .format(dateFormat);
        if (statsByTime[date] !== undefined) {
          statsByTime[date].value++;
          statsByTime[date].totalRevenue += order.totalPrice;
        }
      });
      const result = Object.keys(statsByTime).map((times) => ({
        times,
        value: statsByTime[times].value,
        totalRevenue: statsByTime[times].totalRevenue,
      }));
      return res.status(200).json({
        message: "success",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({ message: "fail", error: "Lỗi server" });
    }
  });
  getStatistics = catchAsync(async (req, res, next) => {
    try {
      const today = moment()
        .add(Number(process.env.UTC), "hours")
        .startOf("day")
        .add(1, "day") // Thêm 1 ngày vào ngày hiện tại
        .toDate();

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
  getOrderRevenueByCategory = catchAsync(async (req, res, next) => {
    try {
      const time = req.params.time;
      let startDate, endDate, dateFormat, incrementUnit;
      switch (time) {
        case "day":
          startDate = moment().startOf("day").toDate();
          endDate = moment(startDate).add(1, "day").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "week":
          startDate = moment().startOf("week").toDate();
          endDate = moment(startDate).add(1, "week").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "month":
          startDate = moment().startOf("month").toDate();
          endDate = moment(startDate).add(1, "month").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "year":
          startDate = moment().startOf("year").toDate();
          endDate = moment(startDate).add(1, "year").toDate();
          dateFormat = "YYYY-MM";
          incrementUnit = "month";
          break;
        default:
          return res
            .status(400)
            .json({ message: "Tham số thời gian không hợp lệ" });
      }
      const result = await OrderMode.aggregate([
        {
          $match: {
            dateOrdered: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $unwind: "$cart",
        },
        {
          $group: {
            _id: "$cart.product",
            totalQuantity: { $sum: "$cart.quantity" },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $group: {
            _id: "$productInfo.Category",
            value: { $sum: "$totalQuantity" },
          },
        },
      ]);
      let re = [];
      for (const item of result) {
        const category = await categoryMode.findById(item._id);
        console.log(category);
        item.name = category.name;
        re.push(item);
      }
      return res.status(200).json({
        message: "Thành công",
        data: re,
      });
    } catch (err) {
      return res.status(400).json({ message: "Thất bại", error: "Lỗi server" });
    }
  });
  getTopSale = catchAsync(async (req, res, next) => {
    try {
      const time = req.params.time;
      let startDate, endDate, dateFormat, incrementUnit;
      switch (time) {
        case "day":
          startDate = moment().startOf("day").toDate();
          endDate = moment(startDate).add(1, "day").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "week":
          startDate = moment().startOf("week").toDate();
          endDate = moment(startDate).add(1, "week").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "month":
          startDate = moment().startOf("month").toDate();
          endDate = moment(startDate).add(1, "month").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "year":
          startDate = moment().startOf("year").toDate();
          endDate = moment(startDate).add(1, "year").toDate();
          dateFormat = "YYYY-MM";
          incrementUnit = "month";
          break;
        default:
          return res
            .status(400)
            .json({ message: "Tham số thời gian không hợp lệ" });
      }

      // Bước 1: Tính tổng totalQuantity
      const totalQuantityResult = await OrderMode.aggregate([
        {
          $match: {
            dateOrdered: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $unwind: "$cart",
        },
        {
          $group: {
            _id: null,
            totalQuantitySum: { $sum: "$cart.quantity" },
          },
        },
      ]);

      const totalQuantitySum =
        totalQuantityResult.length > 0
          ? totalQuantityResult[0].totalQuantitySum
          : 0;

      const result = await OrderMode.aggregate([
        {
          $match: {
            dateOrdered: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $unwind: "$cart",
        },
        {
          $group: {
            _id: "$cart.product",
            totalQuantity: { $sum: "$cart.quantity" },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $project: {
            totalQuantity: 1,
            percentage: {
              $multiply: [
                { $divide: ["$totalQuantity", totalQuantitySum] },
                100,
              ],
            },
            productInfo: 1,
          },
        },
        {
          $sort: {
            totalQuantity: -1,
          },
        },
      ]);

      return res.status(200).json({
        message: "Thành công",
        data: result,
      });
    } catch (err) {
      return res.status(400).json({ message: "Thất bại", error: "Lỗi server" });
    }
  });
  getOrderRevenueByBrand = catchAsync(async (req, res, next) => {
    try {
      const time = req.params.time;
      let startDate, endDate, dateFormat, incrementUnit;
      switch (time) {
        case "day":
          startDate = moment().startOf("day").toDate();
          endDate = moment(startDate).add(1, "day").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "week":
          startDate = moment().startOf("week").toDate();
          endDate = moment(startDate).add(1, "week").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "month":
          startDate = moment().startOf("month").toDate();
          endDate = moment(startDate).add(1, "month").toDate();
          dateFormat = "YYYY-MM-DD";
          incrementUnit = "day";
          break;
        case "year":
          startDate = moment().startOf("year").toDate();
          endDate = moment(startDate).add(1, "year").toDate();
          dateFormat = "YYYY-MM";
          incrementUnit = "month";
          break;
        default:
          return res
            .status(400)
            .json({ message: "Tham số thời gian không hợp lệ" });
      }
      const result = await OrderMode.aggregate([
        {
          $match: {
            dateOrdered: {
              $gte: startDate,
              $lt: endDate,
            },
          },
        },
        {
          $unwind: "$cart",
        },
        {
          $group: {
            _id: "$cart.product",
            totalQuantity: { $sum: "$cart.quantity" },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $group: {
            _id: "$productInfo.Brand",
            value: { $sum: "$totalQuantity" },
          },
        },
        {
          $sort: {
            value: -1,
          },
        },
      ]);
      let re = [];
      let count = 0;
      for (const item of result) {
        const brand = await brandMode.findById(item._id);
        console.log(brand);
        count += item.value;
      }
      for (const item of result) {
        const brand = await brandMode.findById(item._id);
        console.log(brand);
        item.name = brand.name;
        item.percentage = item.value / count;
        re.push(item);
      }
      return res.status(200).json({
        message: "Thành công",
        data: re,
      });
    } catch (err) {
      return res.status(400).json({ message: "Thất bại", error: "Lỗi server" });
    }
  });
}

module.exports = new AdminController();
