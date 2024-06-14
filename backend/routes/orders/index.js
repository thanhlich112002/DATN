const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order.controller");
const AuthController = require("../../controllers/auths.controller");

router.post(
  "/createOrder",
  AuthController.protect,
  orderController.createOrder
);
router.get("/after-checkout/payment", orderController.payment);
router.get(
  "/getOrdersByUserId",
  // AuthController.restrict("User"),
  orderController.getOrdersByUserId
);

router.get(
  "/getOrdersByOrderId/:orderId",
  // AuthController.restrict("User"),
  orderController.getOrdersByOrderId
);
router.get(
  "/getAllOrders",
  // AuthController.restrict("User"),
  orderController.getAllOrders
);
router.get(
  "/getStatisticsOrders",
  // AuthController.restrict("User"),
  orderController.getStatisticsOrders
);
router.get(
  "/cancelOrder/:orderId",
  // AuthController.restrict("User"),
  orderController.cancelOrder
);
router.get(
  "/ReturnOrder/:orderId",
  // AuthController.restrict("User"),
  orderController.ReturnOrder
);

router.get(
  "/chekcomments/:productId",
  AuthController.protect,
  AuthController.restrict("User"),
  orderController.checkComments
);

module.exports = router;
