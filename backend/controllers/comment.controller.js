const Comment = require("../models/comment.model");
const appError = require("../utils/appError.utlis");
const catchAsync = require("../utils/catchAsync.utlis");
const Product = require("../models/product.model");

class commentController {
  createComment = catchAsync(async (req, res, next) => {
    const productID = req.params.productID;
    const imagePaths = req.file?.path || ""; // Assuming req.files contains an array of uploaded image files
    const { content } = req.body;
    const user = req.user._id;

    try {
      const product = await Product.findById(productID);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      const newComment = new Comment({
        product: productID,
        content,
        images: imagePaths,
        user: user,
      });

      const savedComment = await newComment.save();
      res.status(201).json(savedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  delComment = catchAsync(async (req, res, next) => {
    const commentID = req.params.commentID;
    const userId = req.user._id;
    try {
      // Find the comment by ID
      const comment = await Comment.findById(commentID);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Check if the user is the owner of the comment or an admin
      if (
        comment.user.toString() !== userId.toString() &&
        req.user.role !== "admin"
      ) {
        return res
          .status(403)
          .json({ message: "User not authorized to delete this comment" });
      }

      // Delete the comment
      await comment.deleteOne();

      res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });

  updateComment = catchAsync(async (req, res, next) => {
    const commentID = req.params.commentID;
    const userId = req.user._id;
    const { content, image } = req.body;

    console.log(commentID);
    try {
      const comment = await Comment.findById(commentID);
      console.log(comment);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }

      // Check if the user is the owner of the comment
      if (comment.user.toString() !== userId.toString()) {
        return res
          .status(403)
          .json({ message: "User not authorized to update this comment" });
      }

      // Update the comment
      if (content) comment.content = content;
      if (image) comment.image = image;

      // Save the updated comment to the database
      const updatedComment = await comment.save();

      res.status(200).json(updatedComment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
  getAllComment = catchAsync(async (req, res, next) => {
    const commentID = req.params.commentID;
    try {
      const comment = await Comment.find({ product: commentID }).populate(
        "user"
      );
      console.log(comment);
      if (!comment) {
        return res.status(404).json({ message: "Comment not found" });
      }
      res.status(200).json({ data: comment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
}
module.exports = new commentController();
