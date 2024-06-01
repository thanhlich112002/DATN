const Contact = require("../models/contact.model");
const User = require("../models/user.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");

class contactController {
  createContact = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const { phoneNumber, address } = req.body;

    req.body.contact = await Contact.create({
      phoneNumber,
      address,
    });
    req.body.defaultContact = req.body.contact._id;
    return next();
  });
  delContact = catchAsync(async (req, res, next) => {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact)
      return next(new appError("Thông tin liên hệ không tìm thấy!", 404));

    await Contact.findByIdAndDelete(req.params.contactId);
    next();
  });
  updateContact = catchAsync(async (req, res, next) => {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact)
      return next(new appError("Thông tin liên hệ không tìm thấy!", 404));
    contact.phoneNumber = req.body.phoneNumber
      ? req.body.phoneNumber
      : contact.phoneNumber;
    contact.address = req.body.address ? req.body.address : contact.address;
    contact.save();
    req.contact = contact;
    next();
  });
  getAllContact = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params._id);
    if (!user) return next(new appError("Không tìm thấy người dùng!", 404));
    return res.status(200).json(user.contact);
  });
  getDefaultContact = catchAsync(async (req, res, next) => {
    const user = await User.findById(req.params._id);
    const contact = await Contact.findOne({ _id: user.defaultContact });
    if (!user) return next(new appError("Không tìm thấy người dùng!", 404));
    return res.status(200).json(contact);
  });
}
module.exports = new contactController();
