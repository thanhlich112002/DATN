const express = require("express");
const router = express.Router();
const ContactController = require("../../controllers/contact.controller");

router.get("/getAllContact/:_id", ContactController.getAllContact);
router.get("/getDefaultContact/:_id", ContactController.getDefaultContact);

module.exports = router;
