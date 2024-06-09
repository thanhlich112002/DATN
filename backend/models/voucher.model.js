const mongoose = require("mongoose");
const { Schema } = mongoose;
const voucherSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tên phiếu giảm giá là bắt buộc"],
      trim: true,
      minlength: [3, "Tên phiếu giảm giá phải có ít nhất 3 ký tự"],
      maxlength: [100, "Tên phiếu giảm giá không được vượt quá 100 ký tự"],
    },
    amount: {
      type: Number,
      require: [true, "Giá tiền giảm là bắt buộc"],
    },
    code: {
      type: String,
      required: [true, "Mã phiếu giảm giá là bắt buộc"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    conditions: {
      type: Number,
      required: [true, "Điều kiện là bắt buộc"],
    },

    user: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        orderId: {
          type: Schema.Types.ObjectId,
          ref: "Order",
        },
        isUse: {
          type: Boolean, // Sửa từ boolean thành Boolean
          default: false,
        },
      },
    ],
    expiryDate: {
      type: Date,
      required: [true, "Ngày hết hạn là bắt buộc"],
      validate: {
        validator: function (v) {
          return v > Date.now();
        },
        message: "Ngày hết hạn phải là một ngày trong tương lai",
      },
    },
    quantity: {
      type: Number,
      require: [true, "Số lượng là bắt buộc"],
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);
voucherSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.isAvailable = false;
  }
  if (Date.now() > this.expiryDate) {
    this.isAvailable = false;
  }
  next();
});
const Voucher = mongoose.model("Voucher", voucherSchema);

module.exports = Voucher;
