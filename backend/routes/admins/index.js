const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/admin.contriller");

router.get("/getAllUser", AdminController.getAllUser);

router.get("/quantity/:time", AdminController.getQuantityUser);
router.get("/getOrderCount/:time", AdminController.getOrderCount);
router.get(
  "/getOrderRevenueByCategory/:time",
  AdminController.getOrderRevenueByCategory
);
router.get("/getTopSale/:time", AdminController.getTopSale);
router.get("/getStatistics", AdminController.getStatistics);
router.post("/upStatus/:orderId", AdminController.upStatus);
router.get(
  "/getOrderRevenueByBrand/:time",
  AdminController.getOrderRevenueByBrand
);

module.exports = router;
