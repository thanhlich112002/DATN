const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StoreSchema = new Schema(
  {
    photo: {
      type: String,
      default: process.env.DEFAULT_AVATAR,
    },
    name: {
      type: String,
      required: [true, "Tên cửa hàng là bắt buộc"],
    },
    ratingsAverage: {
      type: Number,
      default: 5.0,
      min: [1, "Rating must be above 1.0"],

      max: [5, "Rating must be below 5.0"],
      set: (val) => Math.round(val * 10) / 10,
    },
    openAt: {
      type: String,
      required: [true, "Thời gian mở cửa là bắt buộc"],
    },
    closeAt: {
      type: String,
      required: [true, "Thời gian đóng cửa là bắt buộc"],
    },
    description: {
      type: String,
      trim: true,
    },
    vouchers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Voucher",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

module.exports = mongoose.model("Store", StoreSchema);
