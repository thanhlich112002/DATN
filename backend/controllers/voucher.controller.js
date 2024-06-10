const Voucher = require("../models/voucher.model");
const catchAsync = require("../utils/catchAsync.utlis");

class VoucherController {
  createVoucher = catchAsync(async (req, res) => {
    try {
      const { name, amount, code, conditions, expiryDate, quantity } = req.body;
      const localExpiryDate = new Date(expiryDate);
      const newVoucher = new Voucher({
        name,
        amount,
        code,
        conditions,
        expiryDate: localExpiryDate,
        quantity,
      });

      // Lưu phiếu giảm giá vào cơ sở dữ liệu
      const savedVoucher = await newVoucher.save();

      // Trả về phiếu giảm giá đã lưu với mã trạng thái HTTP 201 (Created)
      res.status(201).json(savedVoucher);
    } catch (err) {
      // Xử lý lỗi nếu có
      res.status(400).json({ message: err.message });
    }
  });

  getAllVouchers = catchAsync(async (req, res) => {
    try {
      const vouchers = await Voucher.find({ isAvailable: "true" });
      res.status(200).json(vouchers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  addVouchers = catchAsync(async (req, res) => {
    try {
      const userId = req.body.userId;
      const voucherID = req.params.voucherID;
      const voucher = await Voucher.findById(voucherID);
      const isUserExist = voucher.user.some((user) => user.userId === userId);
      if (isUserExist) {
        return res.status(400).json({ message: "Phiếu được lưu từ trước" });
      }
      voucher.user.push({ userId: userId });
      const updatedVoucher = await voucher.save();
      res.status(200).json(updatedVoucher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  getVouchersbyCode = catchAsync(async (req, res) => {
    try {
      const voucherCode = req.params.voucherCode;
      const voucher = await Voucher.findOne({ code: voucherCode }); // Sử dụng findOne thay vì find để tìm một phiếu giảm giá duy nhất
      if (voucher) {
        return res.status(200).json(voucher);
      } else {
        return res
          .status(404)
          .json({ message: "Không tìm thấy phiếu giảm giá" }); // Trả về lỗi 404 nếu không tìm thấy
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  getVouchersbyUser = catchAsync(async (req, res) => {
    try {
      const tatolprice = req.body.tatolprice;
      const vouchers = await Voucher.find({
        "user.userId": req.user._id,
        conditions: { $gte: tatolprice },
      });
      res.status(200).json(vouchers);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
}

module.exports = new VoucherController();
