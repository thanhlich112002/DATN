const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const commentSchema = new Schema({
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
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});
module.exports = mongoose.model("Comment", commentSchema);
