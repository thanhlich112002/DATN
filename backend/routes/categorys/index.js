const express = require("express");
const router = express.Router();
const Category = require("../../controllers/categorys.controller");

router.post("/createCategory", Category.creatCategory);

module.exports = router;
