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

  createdefaultContact = catchAsync(async (req, res, next) => {});
  userSendEmail = catchAsync(async (req, res, next) => {
    const doc = req.doc;
    const signUpToken = req.signUpToken;
    // const url = process.env.URL_VERIRY_EMAIL;

    // if (!url) {
    //   return res.status(500).json({
    //     error: "URL_VERIRY_EMAIL chưa được cấu hình.",
    //   });
    // }

    await new Email(doc, signUpToken).send();

    res.status(200).json({
      message: "Mã đã được gửi đến email!",
    });
  });
  addContact = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    console.log(user);
    user.contact.push(req.body.contact);
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  defaultContact = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    user.defaultContact = req.params._id;
    await user.save({ validateBeforeSave: false });
    res.status(200).json(user);
  });
  delContact = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });
    if (req.params.contactId == user.defaultContact)
      next(new appError("Thông tin liên hệ mặc định không được xoá!", 404));
    user.contact = user.contact.filter(
      (obj) => obj._id != req.params.contactId
    );
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
