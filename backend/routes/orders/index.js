const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order.controller");
const AuthController = require("../../controllers/auths.controller");
const NotificationController = require("../../controllers/notification.controller");
router.post(
  "/createOrder",
  AuthController.protect,
  orderController.createOrder
);
router.get(
  "/after-checkout/payment",
  NotificationController.addNotification,
  orderController.payment
);
router.get(
  "/getOrdersByUserId",
  AuthController.protect,
  AuthController.restrict("User"),
  orderController.getOrdersByUserId
);

router.get(
  "/getOrdersByOrderId/:orderId",
  AuthController.protect,
  AuthController.restrict("User"),
  orderController.getOrdersByOrderId
);
router.get(
  "/getAllOrders",
  AuthController.protect,
  AuthController.restrict("User"),
  orderController.getAllOrders
);
router.get(
  "/getStatisticsOrders",
  AuthController.protect,
  AuthController.restrict("User"),
  orderController.getStatisticsOrders
);
router.get(
  "/cancelOrder/:orderId",
  AuthController.protect,
  AuthController.restrict("User"),
  NotificationController.CancelNotification,
  orderController.cancelOrder
);
router.get(
  "/ReturnOrder/:orderId",
  AuthController.protect,
  AuthController.restrict("User"),
  NotificationController.RefundNotification,
  orderController.ReturnOrder
);

router.get(
  "/chekcomments/:productId",
  AuthController.protect,
  AuthController.restrict("User"),
  orderController.checkComments
);

module.exports = router;
