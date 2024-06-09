const express = require("express");
const router = express.Router();
const AdminController = require("../../controllers/admin.contriller");

router.get("/getAllUser", AdminController.getAllUser);

router.get("/quantity", AdminController.getQuantityUser);
router.get("/getStatistics", AdminController.getStatistics);
router.post("/upStatus/:orderId", AdminController.upStatus);

module.exports = router;
