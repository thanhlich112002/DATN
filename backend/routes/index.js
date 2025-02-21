const express = require("express");
const router = express.Router();
router.use("/api/users", require("./users/index"));
router.use("/api/auths", require("./auths/index"));
router.use("/api/contacts", require("./contacts/index"));
router.use("/api/products", require("./products/index"));
router.use("/api/categorys", require("./categorys/index"));
router.use("/api/brands", require("./brands/index"));
router.use("/api/orders", require("./orders/index"));
router.use("/api/comments", require("./comments/index"));
router.use("/api/favorites", require("./favorites/index"));
router.use("/api/admin", require("./admins/index"));
router.use("/api/vouchers", require("./vouchers/index"));
router.use("/api/notification", require("./notification/index"));
router.use("/api/sidebar", require("./sidebar/index"));

module.exports = router;
