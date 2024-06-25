const Brand = require("../models/brand.model");
const catchAsync = require("../utils/catchAsync.utlis");
const Notification = require("../models/notification.model");

class NotificationController {
  addNotification = catchAsync(async (req, res, next) => {
    const MoMo_Params = req.query;
    const requestId = MoMo_Params.requestId;

    try {
      // Check if a notification with the same orderId already exists
      const existingNotification = await Notification.findOne({
        orderId: requestId,
      });
      if (existingNotification) {
        // If the notification already exists, attach it to the request and proceed
        req.Noti = existingNotification;
        return next();
      }

      // If no notification exists, create a new one
      const newNotification = new Notification({
        title: "Đơn hàng mới",
        orderId: requestId,
      });
      const noti = await newNotification.save();
      req.Noti = noti;
      next();
    } catch (err) {
      next(err);
    }
  });
  CancelNotification = catchAsync(async (req, res, next) => {
    const requestId = req.params.orderId;
    try {
      const newNotification = new Notification({
        title: "Hủy đơn hàng",
        orderId: requestId,
      });
      const noti = await newNotification.save();
      req.Noti = noti;
      next();
    } catch (err) {
      next();
    }
  });
  RefundNotification = catchAsync(async (req, res, next) => {
    const requestId = req.params.orderId;
    try {
      const newNotification = new Notification({
        title: "Hoàn trả đơn hàng",
        orderId: requestId,
      });
      const noti = await newNotification.save();
      req.Noti = noti;
      next();
    } catch (err) {
      next();
    }
  });
  finishNotification = catchAsync(async (req, res, next) => {
    const MoMo_Params = req.query;
    const requestId = MoMo_Params.requestId;
    try {
      const newNotification = new Notification({
        title: "Hoàn thành đơn hàng",
        orderId: requestId,
      });
      const noti = await newNotification.save();
      req.Noti = noti;
      next();
    } catch (err) {
      next();
    }
  });
  getAllNotifications = catchAsync(async (req, res, next) => {
    try {
      const notifications = await Notification.find().sort({ createdAt: -1 });
      res.status(200).json({
        status: "success",
        notifications: notifications,
      });
    } catch (err) {
      next(err);
    }
  });
  isSend = catchAsync(async (req, res) => {
    try {
      const notificationId = req.params.notificationId;
      console.log(notificationId);
      const notifications = await Notification.findById(notificationId);
      console.log(notifications);
      notifications.isSend = true;
      await notifications.save();
      res.status(200).json({
        status: "thành công",
      });
    } catch (err) {
      res.status(400).json({
        status: "thất bại",
      });
    }
  });
}

module.exports = new NotificationController();
