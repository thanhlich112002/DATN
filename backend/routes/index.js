const express = require("express");
const router = express.Router();

router.use("/api/users", require("./users/index"));
router.use("/api/auths", require("./auths/index"));
router.use("/api/contacts", require("./contacts/index"));
router.use("/api/products", require("./products/index"));
router.use("/api/categorys", require("./categorys/index"));
module.exports = router;
