const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categorySchema = new Schema({
  name: {
    type: String,
    maxLength: [200, "Mô tả chỉ được tối da 200 kí tự"],
    required: true,
  },
  images: [
    {
      type: String,
      required: [true, "Hình ảnh là bắt buộc"],
    },
  ],
  description: {
    type: String,
    maxLength: [200, "Mô tả chỉ được tối da 200 kí tự"],
    required: true,
  },
});

module.exports = mongoose.model("Category", categorySchema);
