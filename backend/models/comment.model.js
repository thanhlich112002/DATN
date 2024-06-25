const mongoose = require("mongoose");
const moment = require("moment-timezone");

const Schema = mongoose.Schema;
const commentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    content: {
      type: String,
    },
    images: {
      type: String,
    },
    rating: {
      type: Number,
      validate: {
        validator: function (v) {
          return v >= 1 && v <= 5;
        },
        message: (props) =>
          `${props.value} không hợp lệ. Đánh giá phải từ 1 đến 5 sao.`,
      },
    },
    createdAt: {
      type: Date,
      default: () => moment().tz("Asia/Ho_Chi_Minh").toDate(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

module.exports = mongoose.model("Comment", commentSchema);
