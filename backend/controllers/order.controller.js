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

class orderController {
  createOrder = catchAsync(async (req, res, next) => {
    const userId = req.user._id;
    const { cart, totalPrice, contact, shipCost } = req.body;

    let productTotal = 0;

    for (const item of cart) {
      const product = await productModel.findById(item.id);
      if (!product) {
        return next(new appError("Product not found", 404));
      }
      if (product.price !== item.price) {
        return next(new appError("Product price does not match", 400));
      }
      productTotal += item.price * item.quantity;
    }

    const grandTotal = productTotal + shipCost;
    if (grandTotal !== totalPrice) {
      return next(new appError("Total price does not match", 400));
    }
    const newOrder = await Order.create({
      user: userId,
      cart,
      totalPrice: grandTotal,
      shipCost,
      contact,
      status: "Finished",
      dateOrdered: new Date(Date.now() + process.env.UTC * 60 * 60 * 1000),
    });

    // Configure VNPay parameters
    const accessKey = "F8BBA842ECF85";
    const secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
    const orderInfo = "pay with MoMo";
    const partnerCode = "MOMO";
    const redirectUrl =
      "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
    const ipnUrl = "https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b";
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

      console.log(`Status: ${response.status}`);
      console.log(`Headers: ${JSON.stringify(response.headers)}`);
      console.log("Body: ", response.data);

      res.status(200).json({
        status: "success",
        data: newOrder,
        url: response.data.payUrl,
      });
    } catch (error) {
      console.error("Error sending request to MoMo:", error);
      return next(new appError("Failed to create payment request", 500));
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
      end = moment(req.query.end, "DD-MM-YYYY").add(31, "hours").toDate(); // process.env.UTC + 24 hours
    }

    let obj = {
      user: req.params.userId,
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
      Order.find(obj).populate({ path: "contact" }),
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
