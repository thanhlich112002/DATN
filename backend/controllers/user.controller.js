const User = require("../models/user.model");
const { promisify } = require("util");
const appError = require("../utils/appError.utlis");
const AuthsController = require("./auths.controller");
const catchAsync = require("../utils/catchAsync.utlis");
const jwt = require("jsonwebtoken");
const jwtToken = require("../utils/jwtToken.utlis");
const Email = require("../utils/email");

class UserController {
  singUpUser = AuthsController.singUp(User, "User");

  userSendEmail = catchAsync(async (req, res, next) => {
    const doc = req.doc;
    const signUpToken = req.signUpToken;
    await new Email(doc, signUpToken).send();
    res.status(200).json({
      message: "Mã đã được gửi đến email!",
    });
  });
  updateUser = catchAsync(async (req, res, next) => {
    const check = await User.findOne({ email: req.body.email });
    if (check && req.body.email !== req.user.email) {
      return res
        .status(404)
        .json({ error: "Đã có tài khoản sữ dụng Email này" });
    }
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  });
  defaultContact = catchAsync(async (req, res, next) => {
    try {
      const user = await User.findOne({ email: req.user.email });
      if (!req.params._id) {
        return res.status(400).json({ error: "Thiếu ID liên hệ." });
      }
      user.defaultContact = req.params._id;
      await user.save({ validateBeforeSave: false });
      res.status(200).json(user);
    } catch (error) {
      res
        .status(400)
        .json({ error: "Đã xảy ra lỗi khi đặt liên hệ mặc định." });
    }
  });

  getUser = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    res.status(200).json(user);
  });

  addContact = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    console.log(user);
    user.contact.push(req.body.contact);
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  updateContact = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    user.contact = user.contact.filter(
      (obj) => obj._id != req.params.contactId
    );
    user.contact.push(req.contact);
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
}
module.exports = new UserController();
