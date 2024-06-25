const mongoose = require("mongoose");
const { Schema } = mongoose;

const sidebarSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Tên là bắt buộc"],
    },
    img: {
      type: String,
      required: [true, "Ảnh là bắt buộc"],
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
const Sidebar = mongoose.model("Sidebar", sidebarSchema);
module.exports = Sidebar;
