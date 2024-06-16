const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/admin.contriller");

router.post("/getAllUser", AdminController.getAllUser);
router.get("/getStatisticsUser", AdminController.getStatisticsUser);

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
router.get("/getStatisticsProduct", AdminController.getStatisticsProduct);
router.get("/getStatisticsCategory", AdminController.getStatisticsCategory);
router.get(
  "/getStatisticsCategorybyId/:categoryId",
  AdminController.getStatisticsCategorybyId
);
router.get("/getStatisticsBrand", AdminController.getStatisticsBrand);
router.get(
  "/getStatisticsBrandbyId/:BrandId",
  AdminController.getStatisticsBrandbyId
);
router.delete("/DElUser/:userId", AdminController.DElUser);
module.exports = router;
