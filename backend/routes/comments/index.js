const express = require("express");
const router = express.Router();
const CommentController = require("../../controllers/comment.controller");
const AuthController = require("../../controllers/auths.controller");
const CategoryController = require("../../controllers/categorys.controller");

router.post(
  "/createComment/:productID",
  AuthController.protect,
  CategoryController.updatePhoto,
  CommentController.createComment
);
router.delete(
  "/deleteComment/:commentID",
  AuthController.protect,
  CommentController.delComment
);
router.post(
  "/updateComment/:commentID",
  AuthController.protect,
  CommentController.updateComment
);
router.get("/getAllComment/:commentID", CommentController.getAllComment);

module.exports = router;
