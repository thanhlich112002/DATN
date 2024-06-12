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

class orderController {
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
  payment = catchAsync(async (req, res, next) => {
    const MoMo_Params = req.query;
    const requestId = MoMo_Params.requestId;
    if (!requestId) {
      return res.status(400).json({
        status: "error",
        message: "Missing requestId parameter",
      });
    }

    try {
      // Tìm đơn hàng dựa trên requestId
      let order = await Order.findById(requestId);

      // Kiểm tra xem đơn hàng có tồn tại không
      if (!order) {
        return res.status(404).json({
          status: "error",
          message: "Order not found",
        });
      }

      // Kiểm tra trạng thái của đơn hàng
      if (order.status === "Pending") {
        // Cập nhật trạng thái của đơn hàng thành "Confirmed"
        order.status = "Confirmed";
        order.dateCheckout = new Date(
          Date.now() + process.env.UTC * 60 * 60 * 1000
        );

        // Lưu thay đổi vào cơ sở dữ liệu
        await order.save();

        // Trả về kết quả thành công và dữ liệu MoMo_Params
        return res.status(200).json({
          status: "success",
          data: MoMo_Params,
        });
      } else {
        // Trả về lỗi nếu đơn hàng không ở trạng thái "Pending"
        return res.status(400).json({
          status: "error",
          message: "Order is not in pending state",
        });
      }
    } catch (error) {
      // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
      console.error("Error processing payment:", error);
      return res.status(500).json({
        status: "error",
        message: "Internal server error",
      });
    }
  });
  getOrdersByUserId = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params.userId);
    if (!user) return next(new appError("Không tìm thấy người dùng", 404));

    let start, end;
    if (!req.query.start) {
      start = moment()
        .subtract(30, "days")
        .add(process.env.UTC, "hours")
        .toDate();
    } else {
      start = moment(req.query.start, "DD-MM-YYYY")
        .add(process.env.UTC, "hours")
        .toDate();
    }

    if (!req.query.end) {
      end = moment().add(process.env.UTC, "hours").toDate();
    } else {
      end = moment(req.query.end, "DD-MM-YYYY").add(31, "hours").toDate();
    }

    let obj = {
      user: req.params.userId,
      dateOrdered: {
        $gte: start,
        $lt: end,
      },
    };

    const features = new ApiFeatures(
      Order.find(obj).populate({ path: "contact" }).populate("cart.product"),
      req.query
    )
      .sort()
      .limitFields()
      .paginate();
    const orders = await features.query;

    res.status(200).json({
      status: "success",
      length: orders.length,
      data: orders,
    });
  });
  getOrdersByOrderId = catchAsync(async (req, res, next) => {
    const order = await Order.findById(req.params.orderId)
      .populate("user")
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
      start = moment(req.query.start, "DD-MM-YYYY")
        .add(process.env.UTC, "hours")
        .toDate();
    }

    if (!req.query.end) {
      end = moment().add(process.env.UTC, "hours").toDate();
    } else {
      end = moment(req.query.end, "DD-MM-YYYY").add(31, "hours").toDate(); // process.env.UTC + 24 hours
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

  checkComments = catchAsync(async (req, res, next) => {
    try {
      const productId = req.params.productId;
      const order = await Order.find({
        user: req.user.id,
        "cart.product": productId,
        status: { $ne: "Pending" },
      });
      let status = false;
      status = order.length > 0;
      return res.status(200).json(status);
    } catch (err) {
      return res.status(500).json("");
    }
  });
}

function sortObject(obj) {
  let sorted = {};
  let str = [];
  let key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) {
      str.push(encodeURIComponent(key));
    }
  }
  str.sort();
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
  }
  return sorted;
}

module.exports = new orderController();
