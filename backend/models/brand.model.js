const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const BrandSchema = new Schema({
  name: {
    type: String,
    maxLength: [200, "Mô tả chỉ được tối da 200 kí tự"],
  },
  description: {
    type: String,
    maxLength: [200, "Mô tả chỉ được tối da 200 kí tự"],
  },
  images: {
    type: String,
    required: [true, "Hình ảnh là bắt buộc"],
  },
});

module.exports = mongoose.model("Brand", BrandSchema);
