const express = require("express");
const router = express.Router();
const NotificationController = require("../../controllers/notification.controller");
router.get("/getAllNotifications", NotificationController.getAllNotifications);
router.get("/isSend/:notificationId", NotificationController.isSend);

module.exports = router;
