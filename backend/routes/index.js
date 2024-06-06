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

module.exports = router;
