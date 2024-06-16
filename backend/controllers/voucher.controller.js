const Voucher = require("../models/voucher.model");
const ApiFeatures = require("../utils/ApiFeatures.utlis");
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
      const savedVoucher = await newVoucher.save();
      res.status(201).json(savedVoucher);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  updateVoucher = catchAsync(async (req, res) => {
    try {
      const id = req.params.id;
      const { name, amount, code, conditions, expiryDate, quantity } = req.body;
      const localExpiryDate = new Date(expiryDate);

      // Tìm và cập nhật voucher theo id
      const voucher = await Voucher.findById(id);
      if (!voucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }

      // Cập nhật thông tin voucher
      voucher.name = name;
      voucher.amount = amount;
      voucher.code = code;
      voucher.conditions = conditions;
      voucher.expiryDate = localExpiryDate;
      voucher.quantity = quantity;

      // Lưu voucher đã cập nhật
      const savedVoucher = await voucher.save();
      res.status(201).json(savedVoucher);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });

  getAllVouchers = catchAsync(async (req, res) => {
    try {
      const { status, limit, page } = req.query;

      let queryObj = {};
      if (status !== undefined) {
        queryObj.isAvailable = status === "true";
      }

      console.log(queryObj);

      const pageSize = parseInt(limit, 10) || 7;
      const currentPage = parseInt(page, 10) || 1;

      const [totalResults, vouchers, trueCount, falseCount] = await Promise.all(
        [
          Voucher.countDocuments(queryObj),
          Voucher.find(queryObj)
            .skip((currentPage - 1) * pageSize)
            .limit(pageSize),
          Voucher.countDocuments({ isAvailable: true }),
          Voucher.countDocuments({ isAvailable: false }),
        ]
      );

      const totalPages = Math.ceil(totalResults / pageSize);

      return res.status(200).json({
        message: "Thành công",
        data: vouchers,
        totalResults,
        totalPages,
        currentPage,
        trueCount,
        falseCount,
      });
    } catch (err) {
      console.error(err);
      return res
        .status(500)
        .json({ message: "Thất bại", error: "Lỗi máy chủ" });
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
