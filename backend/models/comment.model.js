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
    createdAt: {
      type: Date,
      default: moment().tz("Asia/Ho_Chi_Minh").format(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
module.exports = mongoose.model("Comment", commentSchema);
