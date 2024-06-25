const crypto = require("crypto");
const querystring = require("qs");
const moment = require("moment");
const Order = require("../models/order.model");
const productModel = require("../models/product.model");
const User = require("../models/user.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
const axios = require("axios");
const Voucher = require("../models/voucher.model");
const CryptoJS = require("crypto-js"); // npm install crypto-js
const Email = require("../utils/email");
const { middleware } = require("../utils/socket");
const Notification = require("../models/notification.model");

class orderController {
  createOrder1 = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const { cart, totalPrice, contact, shipCost, voucherID } = req.body;

    try {
      let voucher = null;
      if (voucherID) {
        voucher = await Voucher.findOne({
          _id: voucherID,
          "user.userId": userId,
          "user.isUse": true,
        });
        if (voucher) {
          return res
            .status(404)
            .json({ message: "Mã giảm giá đã được sử dụng" });
        }
        voucher = await Voucher.findOne({
          _id: voucherID,
        });
        if (voucher) {
          if (!voucher.isAvailable) {
            return res.status(400).json({ message: "Mã giảm giá không còn" });
          }
          if (voucher.conditions > totalPrice) {
            return res
              .status(400)
              .json({ message: "Mã giảm giá Không hợp lệ" });
          }
        }
      }
      if (voucher) {
        voucher.quantity -= 1;
        voucher.save();
      }
      let productTotal = 0;
      for (const item of cart) {
        const product = await productModel.findById(item.product);
        if (!product) {
          return next(new appError("Không tìm thấy sản phẩm", 404));
        }
        if (product.price !== item.price) {
          return next(new appError("Giá sản phẩm không khớp", 400));
        }
        if (product.quantity < item.quantity) {
          return next(new appError("Không đủ hàng để", 400));
        }
        product.quantity = product.quantity - item.quantity;
        product.productPurchases = product.productPurchases + item.quantity;
        product.save();
        productTotal += item.price * item.quantity;
      }
      const grandTotal =
        productTotal + shipCost - (voucher ? voucher.amount : 0);
      if (grandTotal !== totalPrice) {
        return next(new appError("Tổng tiền không khớp", 400));
      }

      const newOrder = await Order.create({
        user: userId,
        cart,
        totalPrice: grandTotal,
        shipCost,
        contact,
        dateOrdered: new Date(Date.now() + process.env.UTC * 60 * 60 * 1000),
      });
      if (voucher) {
        voucher.user.push({ userId, orderId: newOrder._id, isUse: "true" });
        await voucher.save();
      }

      const accessKey = "F8BBA842ECF85";
      const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
      const orderInfo = "pay with MoMo";
      const partnerCode = "MOMO";
      const redirectUrl = "http://localhost:3001/account/orders";
      const ipnUrl = "http://localhost:3001/account/orders";
      const requestType = "payWithMethod";
      const amount = newOrder.totalPrice;
      const orderId = newOrder._id;
      const requestId = newOrder._id;
      const extraData = "";
      const paymentCode =
        "T8Qii53fAXyUftPV3m9ysyRhEanUs9KlOPfHgpMR0ON50U10Bh+vZdpJU7VY4z+Z2y77fJHkoDc69scwwzLuW5MzeUKTwPo3ZMaB29imm6YulqnWfTkgzqRaion+EuD7FN9wZ4aXE1+mRt0gHsU193y+yxtRgpmY7SDMU9hCKoQtYyHsfFR5FUAOAKMdw2fzQqpToei3rnaYvZuYaxolprm9+/+WIETnPUDlxCYOiw7vPeaaYQQH0BF0TxyU3zu36ODx980rJvPAgtJzH1gUrlxcSS1HQeQ9ZaVM1eOK/jl8KJm6ijOwErHGbgf/hVymUQG65rHU2MWz9U8QUjvDWA==";
      const orderGroupId = "";
      const autoCapture = true;
      const lang = "vi";

      const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;
      const signature = crypto
        .createHmac("sha256", secretKey)
        .update(rawSignature)
        .digest("hex");

      const requestBody = {
        partnerCode: partnerCode,
        partnerName: "Test",
        storeId: "MomoTestStore",
        requestId: requestId,
        amount: amount,
        orderId: orderId,
        orderInfo: orderInfo,
        redirectUrl: redirectUrl,
        ipnUrl: ipnUrl,
        lang: lang,
        requestType: requestType,
        autoCapture: autoCapture,
        extraData: extraData,
        orderGroupId: orderGroupId,
        signature: signature,
      };

      try {
        const response = await axios.post(
          "https://test-payment.momo.vn/v2/gateway/api/create",
          requestBody,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        res.status(200).json({
          status: "success",
          data: newOrder,
          url: response.data.payUrl,
        });
      } catch (error) {
        console.error("Error sending request to MoMo:", error);
        return next(new appError("Failed to create payment request", 500));
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      return next(new appError("Không thể tạo yêu cầu thanh toán", 500));
    }
  });
  createOrder = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const { cart, totalPrice, contact, shipCost, voucherID } = req.body;
    try {
      let voucher = null;
      if (voucherID) {
        voucher = await Voucher.findOne({
          _id: voucherID,
          "user.userId": userId,
          "user.isUse": true,
        });
        if (voucher) {
          return res
            .status(404)
            .json({ message: "Mã giảm giá đã được sử dụng" });
        }
        voucher = await Voucher.findOne({
          _id: voucherID,
        });
        if (voucher) {
          if (!voucher.isAvailable) {
            return res.status(400).json({ message: "Mã giảm giá không còn" });
          }
          if (voucher.conditions > totalPrice) {
            return res
              .status(400)
              .json({ message: "Mã giảm giá Không hợp lệ" });
          }
        }
      }
      if (voucher) {
        voucher.quantity -= 1;
        voucher.save();
      }
      let productTotal = 0;
      for (const item of cart) {
        const product = await productModel.findById(item.product);
        if (!product) {
          return next(new appError("Không tìm thấy sản phẩm", 404));
        }
        if (product.price !== item.price) {
          return next(new appError("Giá sản phẩm không khớp", 400));
        }
        if (product.quantity < item.quantity) {
          return next(new appError("Không đủ hàng để", 400));
        }
        product.quantity = product.quantity - item.quantity;
        product.productPurchases = product.productPurchases + item.quantity;
        product.save();
        productTotal += item.price * item.quantity;
      }
      const grandTotal =
        productTotal + shipCost - (voucher ? voucher.amount : 0);
      if (grandTotal !== totalPrice) {
        return next(new appError("Tổng tiền không khớp", 400));
      }

      const newOrder = await Order.create({
        user: userId,
        cart,
        totalPrice: grandTotal,
        shipCost,
        contact,
        dateOrdered: new Date(Date.now() + process.env.UTC * 60 * 60 * 1000),
      });
      if (voucher) {
        voucher.user.push({ userId, orderId: newOrder._id, isUse: "true" });
        await voucher.save();
      }
      const config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create",
      };
      const items = [];
      const transID = Math.floor(Math.random() * 1000000);
      const embed_data = {
        redirecturl: `https://datn-7vhw-git-master-lichs-projects.vercel.app/account/orders?requestId=${newOrder._id}`,
      };
      const order = {
        app_id: config.app_id,
        app_trans_id: `${moment().format("YYMMDD")}_${transID}`, // translation missing: vi.docs.shared.sample_code.comments.app_trans_id
        app_user: newOrder._id,

        app_time: Date.now(), // miliseconds
        item: JSON.stringify(items),
        embed_data: JSON.stringify(embed_data),
        amount: newOrder.totalPrice,
        description: `Luxyry - Payment for the order ${newOrder._id}`,
        bank_code: "",
      };

      const data =
        config.app_id +
        "|" +
        order.app_trans_id +
        "|" +
        order.app_user +
        "|" +
        order.amount +
        "|" +
        order.app_time +
        "|" +
        order.embed_data +
        "|" +
        order.item;
      order.mac = CryptoJS.HmacSHA256(data, config.key1).toString();

      try {
        const result = await axios.post(config.endpoint, null, {
          params: order,
        });

        return res.status(200).json(result.data);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.error("Lỗi khi tạo đơn hàng:", error);
      return next(new appError("Không thể tạo yêu cầu thanh toán", 500));
    }
  });
  payment = catchAsync(async (req, res, next) => {
    const MoMo_Params = req.query;
    const requestId = MoMo_Params.requestId;
    const status = parseInt(MoMo_Params.status, 10);
    console.log("UUUU", parseInt(MoMo_Params.status, 10));
    if (!requestId) {
      return res.status(400).json({
        status: "error",
        message: "Missing requestId parameter",
      });
    }

    try {
      let order = await Order.findById(requestId)
        .populate("user")
        .populate("cart.product");

      if (!order) {
        return res.status(404).json({
          status: "error",
          message: "Order not found",
        });
      }
      const currentTime = new Date(
        Date.now() + process.env.UTC * 60 * 60 * 1000
      );

      if (order.status === "Pending" && status === 1) {
        order.status = "Confirmed";
        order.dateCheckout = currentTime;
        await order.save();

        new Email().sendOrderConfirmation(order, "Thông báo xác nhận đơn hàng");
        middleware(req.Noti); // Ensure middleware is appropriately handled

        return res.status(200).json({
          status: "success",
          data: MoMo_Params,
        });
      } else {
        order.status = "Cancelled";
        order.dateCheckout = currentTime;
        await order.save();
        await Notification.findByIdAndDelete(req.Noti._id);
        new Email().sendOrderCancel(
          order,
          "Thông báo thanh toán không thành công"
        );
        return res.status(400).json({
          status: "error",
          message: "Order is not in pending state or status is not confirmed",
        });
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  });

  getOrdersByUserId = catchAsync(async (req, res, next) => {
    console.log(req.query);
    const user = await User.findById(req.query.userId);

    if (!user) return next(new appError("Không tìm thấy người dùng", 404));
    let start, end;
    if (!req.query.start) {
      start = moment()
        .subtract(30, "days")
        .add(process.env.UTC, "hours")
        .toDate();
    } else {
      start = moment(req.query.start, "YYYY-MM-DD")
        .add(process.env.UTC, "hours")
        .toDate();
    }
    if (!req.query.end) {
      end = moment().add(process.env.UTC, "hours").toDate();
    } else {
      end = moment(req.query.end, "YYYY-MM-DD").add(31, "hours").toDate();
    }

    let obj = {
      user: req.query.userId,
      dateOrdered: {
        $gte: start,
        $lt: end,
      },
    };
    if (req.query.status) {
      obj = {
        ...obj,
        status: req.query.status,
      };
    }

    console.log(obj);
    const features = new ApiFeatures(
      Order.find(obj).populate({ path: "contact" }).populate("cart.product"),
      req.query
    )
      .sort()
      .limitFields()
      .paginate();
    const orders = await features.query;
    const totalResults = await Order.countDocuments(obj);
    const pageSize = parseInt(req.query.limit) || 7;
    const totalPages = Math.ceil(totalResults / pageSize);
    const currentPage = parseInt(req.query.page) || 1;
    res.status(200).json({
      status: "success",
      length: orders.length,
      data: orders,
      totalPages,
      currentPage,
    });
  });
  getOrdersByOrderId = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.orderId)
      .populate("user")
      .populate("contact")
      .populate("cart.product");
    if (!order) return next(new appError("Không tìm thấy người dùng", 404));

    res.status(200).json({
      status: "success",
      data: order,
    });
  });
  getAllOrders = catchAsync(async (req, res, next) => {
    let start, end;
    if (!req.query.start) {
      start = moment()
        .subtract(30, "days")
        .add(process.env.UTC, "hours")
        .toDate();
    } else {
      start = moment(req.query.start, "YYYY-MM-DD")
        .add(process.env.UTC, "hours")
        .toDate();
    }
    if (!req.query.end) {
      end = moment().add(process.env.UTC, "hours").toDate();
    } else {
      end = moment(req.query.end, "YYYY-MM-DD").add(31, "hours").toDate(); // process.env.UTC + 24 hours
    }

    let obj = {
      dateOrdered: {
        $gte: start,
        $lt: end,
      },
    };

    if (req.query.status) {
      obj = {
        ...obj,
        status: req.query.status,
      };
    }

    const features = new ApiFeatures(
      Order.find(obj).populate({ path: "contact" }).populate("cart.product"),
      req.query
    )
      .sort()
      .limitFields()
      .paginate();
    const orders = await features.query;
    const totalResults = await Order.countDocuments(obj);
    const pageSize = parseInt(req.query.limit) || 2;
    const totalPages = Math.ceil(totalResults / pageSize);
    const currentPage = parseInt(req.query.page) || 1;

    res.status(200).json({
      status: "success",
      length: orders.length,
      data: orders,
      totalPages,
      currentPage,
    });
  });
  getStatisticsOrders = catchAsync(async (req, res, next) => {
    let start, end;
    if (!req.query.start) {
      start = moment()
        .subtract(30, "days")
        .add(process.env.UTC, "hours")
        .toDate();
    } else {
      start = moment(req.query.start, "YYYY-MM-DD")
        .add(process.env.UTC, "hours")
        .toDate();
    }
    if (!req.query.end) {
      end = moment().add(process.env.UTC, "hours").toDate();
    } else {
      end = moment(req.query.end, "YYYY-MM-DD").add(31, "hours").toDate();
    }

    let obj = {
      dateOrdered: {
        $gte: start,
        $lt: end,
      },
    };

    if (req.query.status) {
      obj = {
        ...obj,
        status: req.query.status,
      };
    }

    const orderStats = await Order.aggregate([
      { $match: obj },
      {
        $group: {
          _id: "$status",
          total: { $sum: 1 },
        },
      },
    ]);

    const totalOrders = await Order.countDocuments(obj);

    let formattedStats = {};
    orderStats.forEach((stat) => {
      formattedStats[stat._id] = stat.total;
    });
    formattedStats["totalOrders"] = totalOrders;

    res.status(200).json({
      status: "success",
      data: formattedStats,
    });
  });
  checkComments = catchAsync(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const existingComment = await Comment.findOne({
        product: productId,
        user: req.user.id,
      });

      if (existingComment) {
        return res.status(400).json(false);
      }
      const order = await Order.find({
        user: req.user.id,
        "cart.product": productId,
        status: { $ne: "Pending" },
      });
      let status = false;
      status = order.length > 0;

      return res.status(200).json(status);
    } catch (err) {
      return res.status(500).json(false);
    }
  });
  ReturnOrder = catchAsync(async (req, res, next) => {
    try {
      const orders = await Order.findById(req.params.orderId)
        .populate("user")
        .populate("cart.product");
      orders.status = "Cancelled";
      console.log(orders);
      await orders.save();
      if (orders.status === "Cancelled") {
        new Email().sendOrderCancel(orders, "Thông báo hoàn trả đơn hàng");
      }
      middleware(req.Noti);
      return res.status(200).json({
        success: true,
        message: "Hoàn đơn thành công",
        data: orders.status,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Đã xảy ra lỗi khi hoàn đơn trạng thái đơn hàng",
        error: error.message,
      });
    }
  });
  cancelOrder = async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order = await Order.findById(orderId)
        .populate("user")
        .populate("cart.product");
      if (!order) {
        return res.status(404).json({ message: "Không tìm thấy đơn hàng" });
      }
      if (order.status !== "Pending" && order.status !== "Confirmed") {
        return res
          .status(404)
          .json({ message: "Không thể hủy đơn hàng trạng thái này" });
      }
      for (const item of order.cart) {
        const product = await productModel.findById(item.product);
        if (product) {
          product.quantity += item.quantity;
          await product.save();
        }
      }
      order.status = "Cancelled";
      await order.save();
      if (order.status === "Cancelled") {
        new Email().sendOrderCancel(order, "Thông báo hủy đơn hàng");
      }
      middleware(req.Noti);
      res.status(200).json({ message: "Đơn hàng đã được hủy" });
    } catch (error) {
      console.error("Lỗi khi hủy đơn hàng:", error);
      return res.status(404).json({ message: "Lỗi hủy đơn hàng" });
    }
  };
}

module.exports = new orderController();
