const UserMode = require("../models/user.model");
const ProductMode = require("../models/product.model");
const OrderMode = require("../models/order.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const parser = require("../utils/uploadConfig.utlis");
const moment = require("moment");
const categoryMode = require("../models/category.model");
const brandMode = require("../models/brand.model");
const mongoose = require("mongoose");
const orderModel = require("../models/order.model");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
const userModel = require("../models/user.model");
const Email = require("../utils/email");
const sendNotification = require("../../backend/index.js");

class AdminController {
  getAllUser = catchAsync(async (req, res, next) => {
    try {
      const { status, role } = req.body;
      let queryObj = {};
      if (role) {
        queryObj.role = role;
      }
      // if (status != null) {
      //   queryObj.isAvailable = status;
      // }
      console.log(queryObj);
      const pageSize = parseInt(req.query.limit, 10) || 7;
      const currentPage = parseInt(req.query.page, 10) || 1;
      let query = UserMode.find(queryObj);
      if (req.query.search) {
        query = new ApiFeatures(query, req.query)
          .filter()
          .search()
          .sort().query;
      } else {
        query = new ApiFeatures(query, req.query).filter().sort().query;
      }
      const totalResults = await UserMode.countDocuments(query);
      const totalPages = Math.ceil(totalResults / pageSize);
      const users = await query
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize);
      return res.status(200).json({
        message: "success",
        data: users,
        totalResults,
        totalPages,
        currentPage,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "fail", error: "Lỗi máy chủ" });
    }
  });
  getStatisticsUser = catchAsync(async (req, res, next) => {
    try {
      // Thống kê số lượng tài khoản theo isVerified
      const statsByIsVerified = await userModel.aggregate([
        {
          $group: {
            _id: "$isVerified",
            count: { $sum: 1 },
          },
        },
      ]);

      // Thống kê số lượng tài khoản theo role
      const statsByRole = await userModel.aggregate([
        {
          $group: {
            _id: "$role",
            count: { $sum: 1 },
          },
        },
      ]);
      const rus = {
        IsVerifiedTrue:
          statsByIsVerified.find((item) => item._id === true)?.count || 0,
        IsVerifiedFalse:
          statsByIsVerified.find((item) => item._id === false)?.count || 0,
        RoleUser: statsByRole.find((item) => item._id === "User")?.count || 0,
        RoleAdmin: statsByRole.find((item) => item._id === "Admin")?.count || 0,
      };

      res.status(200).json({
        success: true,
        message: "Thống kê số lượng tài khoản thành công",
        data: rus,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi thực hiện thống kê số lượng tài khoản",
        error: error.message,
      });
    }
  });

  getQuantityUser = catchAsync(async (req, res, next) => {
    try {
      let listo = 0;
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
      const orders = await OrderMode.find({
        dateOrdered: {
          $gte: startDate,
          $lt: endDate,
        },
      });
      const statsByTime = {};
      const timeUnits = [];
      let currentTime = moment(startDate);

      while (currentTime.isBefore(endDate)) {
        const times = currentTime.format(dateFormat);
        timeUnits.push(times);
        statsByTime[times] = { value: 0, totalRevenue: 0 };
        currentTime.add(1, incrementUnit);
      }

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
        .add(1, "day")
        .add(process.env.UTC, "hours")
        .toDate();

      const startOfMonth = moment()
        .startOf("day")
        .add(process.env.UTC, "hours")
        .toDate();
      console.log(today);
      const orders = await OrderMode.find({
        dateOrdered: {
          $gte: startOfMonth,
          $lt: today,
        },
      });
      const totalOrders = orders.length;
      let totalAmount = 0;
      orders.forEach((order) => {
        if (order.status !== "Pending" && order.status !== "Cancelled")
          console.log(order.status);
        totalAmount += order.totalPrice;
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
      const orders = await OrderMode.findById(req.params.orderId)
        .populate("user")
        .populate("cart.product");
      const { notification, status } = req.body;
      orders.status = status;
      if (notification) {
        orders.notification = notification;
      }
      console.log(orders);
      if (status === "Cancelled") {
        new Email().sendOrderCancel(orders, "Thông báo hủy đơn");
      }
      if (status === "Shipped") {
        new Email().sendOrderCancel(
          orders,
          "Thông báo đơn hàng đang được vận chuyển"
        );
      }
      if (status === "Finished") {
        new Email().sendOrderCancel(orders, "Thông báo hoàn thành đơn hàng");
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
        count += item.value;
      }
      for (const item of result) {
        const brand = await brandMode.findById(item._id);
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
  getStatisticsProduct = catchAsync(async (req, res) => {
    try {
      const stats = await ProductMode.aggregate([
        {
          $facet: {
            statsProduct1: [
              { $match: { isAvailable: false } },
              { $count: "count" },
            ],
            statsProduct2: [
              { $match: { isAvailable: true } },
              { $count: "count" },
            ],
            statsProduct3: [
              { $match: { isOutofOrder: true } },
              { $count: "count" },
            ],
            totalQuantity: [
              { $group: { _id: null, total: { $sum: "$quantity" } } },
            ],
          },
        },
      ]);

      const countUnavailable = stats[0].statsProduct1[0]
        ? stats[0].statsProduct1[0].count
        : 0;
      const countavailable = stats[0].statsProduct2[0]
        ? stats[0].statsProduct2[0].count
        : 0;
      const countOutofOrder = stats[0].statsProduct3[0]
        ? stats[0].statsProduct3[0].count
        : 0;
      const totalQuantity = stats[0].totalQuantity[0]
        ? stats[0].totalQuantity[0].total
        : 0;

      res.status(200).json({
        status: "success",
        data: {
          countUnavailable,
          countavailable,
          countOutofOrder,
          totalQuantity,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  });
  getStatisticsCategory = catchAsync(async (req, res) => {
    try {
      const stats = await categoryMode.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "Category",
            as: "products",
          },
        },
        {
          $addFields: {
            totalQuantity: { $sum: "$products.quantity" },
            isOutofOrder: {
              $anyElementTrue: "$products.isOutofOrder",
            },
            isAvailable: {
              $anyElementTrue: "$products.isAvailable",
            },
          },
        },
        {
          $facet: {
            categoriesWithZeroProducts: [
              { $match: { totalQuantity: 0 } },
              { $count: "totalCategoriesWithZeroProducts" },
            ],
            categoriesOutOfStock: [
              { $match: { isOutofOrder: true } },
              { $count: "totalCategoriesOutOfStock" },
            ],
            categoriesWithAvailableProducts: [
              { $match: { isAvailable: true } },
              { $count: "totalCategoriesWithAvailableProducts" },
            ],
            totalCategories: [{ $count: "totalCategories" }],
          },
        },
      ]);

      const totalCategoriesWithZeroProducts = stats[0]
        .categoriesWithZeroProducts[0]
        ? stats[0].categoriesWithZeroProducts[0].totalCategoriesWithZeroProducts
        : 0;

      const totalCategoriesOutOfStock = stats[0].categoriesOutOfStock[0]
        ? stats[0].categoriesOutOfStock[0].totalCategoriesOutOfStock
        : 0;

      const totalCategoriesWithAvailableProducts = stats[0]
        .categoriesWithAvailableProducts[0]
        ? stats[0].categoriesWithAvailableProducts[0]
            .totalCategoriesWithAvailableProducts
        : 0;

      const totalCategories = stats[0].totalCategories[0]
        ? stats[0].totalCategories[0].totalCategories
        : 0;

      res.status(200).json({
        status: "success",
        data: {
          totalCategoriesWithZeroProducts,
          totalCategoriesOutOfStock,
          totalCategoriesWithAvailableProducts,
          totalCategories,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  });
  getStatisticsCategorybyId = catchAsync(async (req, res) => {
    const categoryId = new mongoose.Types.ObjectId(req.params.categoryId);

    try {
      const time = "month";
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
      const orders = await orderModel.aggregate([
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
          $lookup: {
            from: "products",
            localField: "cart.product",
            foreignField: "_id",
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $match: {
            "productInfo.Category": categoryId,
          },
        },
        {
          $group: {
            _id: "$productInfo.Category",
            totalSalesRevenue: {
              $sum: { $multiply: ["$cart.quantity", "$productInfo.price"] },
            },
            totalSalesQuantity: {
              $sum: "$cart.quantity",
            },
          },
        },
      ]);
      const stats = await categoryMode.aggregate([
        {
          $match: { _id: categoryId }, // Lọc theo id của danh mục
        },
        {
          $lookup: {
            from: "products", // Tên của collection chứa dữ liệu sản phẩm
            localField: "_id", // Trường trong collection hiện tại (categoryMode) để dùng làm điều kiện join
            foreignField: "Category", // Trường trong collection products để so sánh với localField
            as: "products", // Tên của trường mới chứa kết quả sau khi join
          },
        },
        {
          $addFields: {
            totalProducts: { $size: "$products" }, // Tổng số sản phẩm trong danh mục
            totalAvailableProducts: {
              $size: {
                $filter: {
                  input: "$products",
                  as: "product",
                  cond: { $eq: ["$$product.isAvailable", true] }, // Đếm số sản phẩm còn hàng
                },
              },
            },
            totalOutOfOrderProducts: {
              $size: {
                $filter: {
                  input: "$products",
                  as: "product",
                  cond: { $eq: ["$$product.isOutofOrder", true] }, // Đếm số sản phẩm hết hàng
                },
              },
            },
          },
        },
      ]);
      const result = {
        totalProducts: stats[0]?.totalProducts ?? 0,
        totalAvailableProducts: stats[0]?.totalAvailableProducts ?? 0,
        totalOutOfOrderProducts: stats[0]?.totalOutOfOrderProducts ?? 0,
        totalSalesRevenue: orders[0]?.totalSalesRevenue ?? 0,
        totalSalesQuantity: orders[0]?.totalSalesQuantity ?? 0,
      };
      return res.status(200).json({
        message: "Thành công",
        data: result,
      });
    } catch (error) {
      console.error("Lỗi khi lấy doanh số bán hàng của danh mục:", error);
      return res.status(500).json({
        message: "Đã xảy ra lỗi khi lấy doanh số bán hàng của danh mục",
      });
    }
  });
  getStatisticsBrand = catchAsync(async (req, res) => {
    try {
      const stats = await brandMode.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "Brand",
            as: "products",
          },
        },
        {
          $addFields: {
            totalQuantity: { $sum: "$products.quantity" },
            isOutofOrder: {
              $anyElementTrue: "$products.isOutofOrder",
            },
            isAvailable: {
              $anyElementTrue: "$products.isAvailable",
            },
          },
        },
        {
          $facet: {
            brandsWithZeroProducts: [
              { $match: { totalQuantity: 0 } },
              { $count: "totalBrandsWithZeroProducts" },
            ],
            brandsOutOfStock: [
              { $match: { isOutofOrder: true } },
              { $count: "totalBrandsOutOfStock" },
            ],
            brandsWithAvailableProducts: [
              { $match: { isAvailable: true } },
              { $count: "totalBrandsWithAvailableProducts" },
            ],
            totalBrands: [{ $count: "totalBrands" }],
          },
        },
      ]);

      const totalBrandsWithZeroProducts = stats[0].brandsWithZeroProducts[0]
        ? stats[0].brandsWithZeroProducts[0].totalBrandsWithZeroProducts
        : 0;

      const totalBrandsOutOfStock = stats[0].brandsOutOfStock[0]
        ? stats[0].brandsOutOfStock[0].totalBrandsOutOfStock
        : 0;

      const totalBrandsWithAvailableProducts = stats[0]
        .brandsWithAvailableProducts[0]
        ? stats[0].brandsWithAvailableProducts[0]
            .totalBrandsWithAvailableProducts
        : 0;

      const totalBrands = stats[0].totalBrands[0]
        ? stats[0].totalBrands[0].totalBrands
        : 0;

      res.status(200).json({
        status: "success",
        data: {
          totalBrandsWithZeroProducts,
          totalBrandsOutOfStock,
          totalBrandsWithAvailableProducts,
          totalBrands,
        },
      });
    } catch (error) {
      res.status(400).json({
        status: "fail",
        message: error.message,
      });
    }
  });
  getStatisticsBrandbyId = catchAsync(async (req, res) => {
    const BrandId = new mongoose.Types.ObjectId(req.params.BrandId);
    console.log(BrandId); // Lấy ID của thương hiệu từ request
    try {
      const time = "month"; // Thời gian: ngày, tuần, tháng, năm
      let startDate, endDate, dateFormat, incrementUnit;

      // Thiết lập khoảng thời gian dựa trên thời gian được chỉ định
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

      // Lấy thống kê doanh số bán hàng theo thương hiệu
      const orders = await orderModel.aggregate([
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
          $lookup: {
            from: "products", // Tên collection chứa dữ liệu sản phẩm
            localField: "cart.product", // Trường localField trong collection Order liên kết với product trong cart
            foreignField: "_id", // Trường foreignField trong collection products
            as: "productInfo",
          },
        },
        {
          $unwind: "$productInfo",
        },
        {
          $match: {
            "productInfo.Brand": BrandId, // Lọc theo ID của thương hiệu
          },
        },
        {
          $group: {
            _id: "$productInfo.Brand",
            totalSalesRevenue: {
              $sum: { $multiply: ["$cart.quantity", "$productInfo.price"] }, // Tính tổng doanh số
            },
            totalSalesQuantity: {
              $sum: "$cart.quantity", // Tính tổng số lượng bán được
            },
          },
        },
      ]);

      // Lấy thông tin số lượng sản phẩm của thương hiệu
      const stats = await brandMode.aggregate([
        {
          $match: { _id: BrandId }, // Lọc theo id của thương hiệu
        },
        {
          $lookup: {
            from: "products", // Tên của collection chứa dữ liệu sản phẩm
            localField: "_id", // Trường trong collection hiện tại (categoryMode) để dùng làm điều kiện join
            foreignField: "Brand", // Trường trong collection products để so sánh với localField
            as: "products", // Tên của trường mới chứa kết quả sau khi join
          },
        },
        {
          $addFields: {
            totalProducts: { $size: "$products" }, // Tổng số sản phẩm của thương hiệu
            totalAvailableProducts: {
              $size: {
                $filter: {
                  input: "$products",
                  as: "product",
                  cond: { $eq: ["$$product.isAvailable", true] }, // Đếm số sản phẩm còn hàng
                },
              },
            },
            totalOutOfOrderProducts: {
              $size: {
                $filter: {
                  input: "$products",
                  as: "product",
                  cond: { $eq: ["$$product.isOutofOrder", true] }, // Đếm số sản phẩm hết hàng
                },
              },
            },
          },
        },
      ]);
      console.log(stats);

      // Tạo kết quả trả về
      const result = {
        totalProducts: stats[0]?.totalProducts ?? 0,
        totalAvailableProducts: stats[0]?.totalAvailableProducts ?? 0,
        totalOutOfOrderProducts: stats[0]?.totalOutOfOrderProducts ?? 0,
        totalSalesRevenue: orders[0]?.totalSalesRevenue ?? 0,
        totalSalesQuantity: orders[0]?.totalSalesQuantity ?? 0,
      };

      // Trả về kết quả thành công
      return res.status(200).json({
        message: "Thành công",
        data: result,
      });
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error(
        "Lỗi khi lấy thống kê doanh số bán hàng của thương hiệu:",
        error
      );
      return res.status(500).json({
        message:
          "Đã xảy ra lỗi khi lấy thống kê doanh số bán hàng của thương hiệu",
      });
    }
  });
  DElUser = catchAsync(async (req, res) => {
    const userId = req.params.userId;
    console.log(userId);
    const user = await userModel.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Người dùng không tồn tại",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Người dùng đã được xóa thành công",
    });
  });
}

module.exports = new AdminController();
