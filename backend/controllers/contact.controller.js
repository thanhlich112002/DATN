const Contact = require("../models/contact.model");
const User = require("../models/user.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");

class contactController {
  createContact = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const { phoneNumber, address } = req.body.contact;
    req.body.contact = await Contact.create({
      phoneNumber,
      address,
    });
    req.body.defaultContact = req.body.contact._id;
    return next();
  });
  delContact = catchAsync(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email });

    // Check if the contact to be deleted is the default contact
    if (req.params.contactId === user.defaultContact.toString()) {
      return res.status(400).json({
        error: "Không thể xóa địa chỉ mặc định",
      });
    }

    // Find the contact by ID
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(400).json({
        error: "Contact information not found!",
      });
    }

    // Filter out the contact to be deleted from the user's contact list
    user.contact = user.contact.filter(
      (obj) => obj._id.toString() !== req.params.contactId
    );

    // Delete the contact
    await Contact.findByIdAndDelete(req.params.contactId);
    await user.save({ validateBeforeSave: false });

    // Respond with the updated user information
    res.status(200).json({
      status: "success",
      message: "Contact deleted successfully",
      data: user,
    });
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
