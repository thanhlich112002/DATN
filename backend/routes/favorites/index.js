const express = require("express");
const router = express.Router();
const FavoriteController = require("../../controllers/favorite.controller");
const AuthController = require("../../controllers/auths.controller");

router.post(
  "/addFavorite/:productID",
  AuthController.protect,
  FavoriteController.addToFavorites
);
router.get(
  "/GetFavorites",
  AuthController.protect,
  FavoriteController.GetFavorites
);

module.exports = router;
