const User = require("../models/user.model");
const { promisify } = require("util");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const jwt = require("jsonwebtoken");
const jwtToken = require("../utils/jwtToken.utlis");
const crypto = require("crypto");
const Email = require("../utils/email");

class AuthController {
  singUp = (Model, role) =>
    catchAsync(async (req, res, next) => {
      let body = {
        ...req.body,
        role,
        isVerified: false,
        photo: process.env.DEFAULT_AVATAR,
      };
      const doc = await Model.create(body);
      const signUpToken = doc.createSignUpToken();

      await doc.save({ validateBeforeSave: false });
      // 3) Gửi email chứa mã token tới email của doc
      req.doc = doc;
      req.signUpToken = signUpToken;
      res.status(200).json({ status: "success", data: doc });
      next();
    });
  login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new appError("Vui lòng nhập email và mật khẩu", 400));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new appError("Email không hợp lệ", 401));
    }
    if (await !user.isCorrectPassword(user.password, password)) {
      return next(new appError("Mật khẩu không hợp lệ", 401));
    }
    jwtToken.generateAndSendJWTToken(user, 200, res, req);
  });
  logout = catchAsync((req, res, next) => {
    res.cookie("jwt", "", { expires: new Date(Date.now() - 10 * 1000) });
    res.status(200).json({ status: "success" });
  });

  changePassword = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.params.email }).select(
      "+password"
    );
    console.log(user);
    if (req.body.newPassword !== req.body.comfirmPassword) {
      return next(new appError("Xác nhận mật khẩu mới không chính xác", 401));
    }
    console.log(user.password);
    if (!(await user.isCorrectPassword(user.password, req.body.oldPassword))) {
      return next(new appError("Mật khẩu cũ không chính xác", 401));
    }
    user.password = req.body.newPassword;
    user.passwordConfirm = req.body.newPassword;
    await user.save();
    res
      .clearCookie("jwt")
      .status(200)
      .json({ message: "Cập nhật mật khẩu thành công" });
  });
  forgetPassword = catchAsync(async (req, res, next) => {
    const email = req.params.email;
    const user = await User.findOne({ email: email });
    if (!user) {
      return next(new appError("Không tìm thấy Email", 401));
    }
    const resetToken = user.createSignUpToken();
    await user.save({ validateBeforeSave: false });

    await new Email(user, resetToken, "").sendPasswordReset();
    res.status(200).json({
      message: "Mã đã được gửi đến email!",
    });
  });

  verifyToken = catchAsync(async (req, res, next) => {
    console.log(req.body.signUpToken);
    const token = crypto
      .createHash("sha256")
      .update(req.body.signUpToken.toString())
      .digest("hex");

    const doc = await User.findOne({ email: req.params.email }).select(
      "+signUpToken +signUpExpires"
    );
    console.log(doc.signUpToken);
    if (!doc || doc.signUpToken !== token) {
      return next(new appError(" Mã không hợp lệ  ", 400));
    }

    if (!doc.signUpExpires > new Date()) {
      return next(new appError("Mã đã hết hạn", 400));
    }

    res.status(200).json({
      message: "Vui lòng đặt mật khẩu mới",
      doc,
    });
  });
  resetPassword = catchAsync(async (req, res, next) => {
    console.log(req.body.signUpToken);
    const token = crypto
      .createHash("sha256")
      .update(req.body.signUpToken.toString())
      .digest("hex");

    const doc = await User.findOne({ email: req.params.email }).select(
      "+signUpToken +signUpExpires"
    );
    if (!doc || doc.signUpToken !== token) {
      return next(new appError("Mã đã hết hạn", 400));
    }

    if (!doc.signUpExpires > new Date()) {
      return next(new appError("Mã không hợp lệ ", 400));
    }
    if (req.body.newPassword !== req.body.comfirmPassword) {
      return next(new appError("Xác nhận mật khẩu mới không chính xác", 401));
    }
    doc.password = req.body.newPassword;
    doc.comfirmPassword = req.body.newPassword;
    doc.signUpExpires = undefined;
    doc.signUpToken = undefined;
    await doc.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Thành công!",
      doc,
    });
  });

  verifySingUpToken = catchAsync(async (req, res, next) => {
    console.log(req.body.signUpToken);
    const token = crypto
      .createHash("sha256")
      .update(req.body.signUpToken.toString())
      .digest("hex");

    const doc = await User.findOne({ email: req.params.email }).select(
      "+signUpToken +signUpExpires"
    );
    if (!doc || doc.signUpToken !== token) {
      return next(new appError("Mã đã hết hạn", 400));
    }

    if (!doc.signUpExpires > new Date()) {
      return next(new appError("Mã không hợp lệ ", 400));
    }
    doc.signUpExpires = undefined;
    doc.signUpToken = undefined;
    doc.isVerified = true;
    await doc.save({ validateBeforeSave: false });

    res.status(200).json({
      message: "Đăng kí thành công!",
      doc,
    });
  });

  protect = catchAsync(async (req, res, next) => {
    //1. Read the token & check if it exists
    console.log(req.cookies);
    let token = req.cookies.jwt;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2. validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3. If the user is exits
    const user = await User.findById(decoded.id);
    console.log(user);
    if (!user) {
      return next(new appError("Người dùng không tồn tại!", 401));
    }
    req.user = user;
    next();
  });
  getUser = catchAsync(async (req, res, next) => {
    console.log(req);
    let token = req.cookies.jwt;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    // 2. validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);
    // 3. If the user is exits
    const user = await User.findById(decoded.id);
    console.log(user);
    if (!user) {
      return next(new appError("Người dùng không tồn tại!", 401));
    }
    req.user = user;
    res.status(200).json({ message: "success", data: user });
  });

  restrict = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role))
        next(new appError("Bạn không có quyền thực hiện yêu cầu này.", 403));
      next();
    };
  };
}
module.exports = new AuthController();
