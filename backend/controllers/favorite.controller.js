const Favorite = require("../models/favorite.model");

exports.addToFavorites = async (req, res) => {
  const productID = req.params.productID;
  const userId = req.user._id;
  try {
    const existingFavorite = await Favorite.findOne({
      user: userId,
      product: productID,
    });

    if (existingFavorite) {
      if (existingFavorite.isFavorite) {
        existingFavorite.isFavorite = false;
        await existingFavorite.save();
        return res.status(200).json(false);
      } else {
        existingFavorite.isFavorite = true;
        await existingFavorite.save();
        return res.status(200).json(true);
      }
    }

    const newFavorite = new Favorite({
      user: userId,
      product: productID,
      isFavorite: true,
    });
    await newFavorite.save();
    return res.status(200).json(true);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};

exports.GetFavorites = async (req, res) => {
  const userId = req.user._id;
  try {
    const existingFavorite = await Favorite.find({
      user: userId,
      isFavorite: true,
    }).populate("product");

    // Nếu sản phẩm chưa tồn tại trong danh sách yêu thích, thêm mới

    res.status(201).json({
      message: "",
      data: existingFavorite,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi máy chủ" });
  }
};
