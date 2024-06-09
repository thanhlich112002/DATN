const express = require("express");
const router = express.Router();
const voucherController = require("../../controllers/voucher.controller");
const authsController = require("../../controllers/auths.controller");

router.post("/createVoucher", voucherController.createVoucher);
router.get("/getAllVouchers", voucherController.getAllVouchers);
router.post(
  "/addVouchers/:voucherID",
  authsController.protect,
  voucherController.addVouchers
);
router.get(
  "/getVouchersbyCode/:voucherCode",
  authsController.protect,
  voucherController.getVouchersbyCode
);
// router.post("/checkVouchers/:voucherID", voucherController.checkVouchers);
router.post(
  "/getVouchersbyUser",
  authsController.protect,
  voucherController.getVouchersbyUser
);

module.exports = router;
