const express = require("express");
const router = express.Router();
const orderController = require("../../controllers/order.controller");
const AuthController = require("../../controllers/auths.controller");

router.post(
  "/createOrder",
  AuthController.protect,
  orderController.createOrder
);
router.get(
  "/getOrdersByUserId/:userId",
  // authController.restrict("User"),
  orderController.getOrdersByUserId
);

module.exports = router;
