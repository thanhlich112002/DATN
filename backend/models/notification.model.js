const mongoose = require("mongoose");
const moment = require("moment-timezone");
const Schema = mongoose.Schema;
const NotificationSchema = new Schema({
  title: {
    type: String,
    maxLength: [200, "Mô tả chỉ được tối da 200 kí tự"],
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Order",
  },
  createdAt: {
    type: Date,
    default: () => moment().tz("Asia/Ho_Chi_Minh").toDate(),
  },
  isSend: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Notification", NotificationSchema);
