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
  getAllVouchers = catchAsync(async (req, res) => {
    try {
      const { status } = req.body;
      let queryObj = {};
      if (status != null) {
        queryObj.isAvaliable = status;
      }
      console.log(queryObj);
      const pageSize = parseInt(req.query.limit, 10) || 7;
      const currentPage = parseInt(req.query.page, 10) || 1;
      let query = Voucher.find(queryObj);
      if (req.query.search) {
        query = new ApiFeatures(query, req.query).filter().search().sort();
      } else {
        query = new ApiFeatures(query, req.query).filter().sort().query;
      }
      const totalResults = await Voucher.countDocuments(query);
      const totalPages = Math.ceil(totalResults / pageSize);
      const vouchers = await query
        .skip((currentPage - 1) * pageSize)
        .limit(pageSize);
      return res.status(200).json({
        message: "Thành công",
        data: vouchers,
        totalResults,
        totalPages,
        currentPage,
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
