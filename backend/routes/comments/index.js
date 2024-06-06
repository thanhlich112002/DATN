const express = require("express");
const router = express.Router();
const CommentController = require("../../controllers/comment.controller");
const AuthController = require("../../controllers/auths.controller")

router.post("/createComment/:productID", AuthController.protect, CommentController.createComment);
router.delete("/deleteComment/:commentID", AuthController.protect, CommentController.delComment);
router.post("/updateComment/:commentID", AuthController.protect, CommentController.updateComment);

module.exports = router;