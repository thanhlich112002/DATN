import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaperPlane,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../service/userContext"; // Import the custom hook
import {
  getProductsbyID,
  createComment,
  getAllComment,
  chekcomments,
  viewsProduct,
} from "../../service/API";
import { useParams, useNavigate } from "react-router-dom";
import RatingStars from "./RatingStars";
import style from "./Product.css";
import { toast } from "react-toastify";
import { addFavorite } from "../../service/API";
import Category from "../Category/category";
import Item from "../Category/item";
import { getAllProductsbyCat } from "../../service/API";

function Product({ setIsLoading }) {
  const { addToCart } = useUser();
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [listComment, setListComment] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [image, setImage] = useState(null);
  const [favorites, setFavorites] = useState(0);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(0);
  const [iscomment, setIsComment] = useState(false);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const handleAddToFavorites = async (productId) => {
    const favorites = await addFavorite(productId);
    console.log(favorites.data);
    if (favorites.data) {
      toast.success("Đã thêm vào yêu thích!");
    } else {
      toast.success("Đã xóa yêu thích!");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const fetchIsComents = async () => {
    try {
      setIsLoading(true);
      const productData = await chekcomments(id);
      console.log(productData.data);
      setIsComment(productData.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(false);
    }
  };
  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const productData = await getProductsbyID(id);
      setProduct(productData.data.data[0]);
      setFavorites(productData.data.favorites);
      setActiveImage(productData.data.data[0]?.images[0]);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(false);
    }
  };
  const fetchComment = async () => {
    try {
      setIsLoading(true);
      const Comment = await getAllComment(id);
      setListComment(Comment.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product data:", error);
      setIsLoading(false);
    }
  };

  const fviewsProduct = async () => {
    try {
      const Comment = await viewsProduct(id);
    } catch (error) {}
  };

  useEffect(() => {
    fviewsProduct();
    fetchProduct();
    fetchComment();
    fetchIsComents();
    fetchProducts(product?.Category._id);
  }, [id]);
  useEffect(() => {
    fetchProducts(product?.Category._id);
  }, [product]);

  const handleNext = () => {
    if (product && startIndex + 4 < product.images?.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const handlePrev = () => {
    if (startIndex - 1 >= 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleSubmitComment = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    formData.append("images", image);
    formData.append("rating", rating);
    fetchProduct();
    fetchComment();
    fetchIsComents();
    try {
      await createComment(formData, product._id);
      fviewsProduct();
      fetchProduct();
      fetchComment();
      fetchIsComents();
      fetchProducts(product?.Category._id);
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };
  const handleNavClick = () => {
    navigate(`/collections?category=${encodeURIComponent(Category._id)}`);
  };
  const handleNavClickOrder = () => {
    navigate(`/checkout?product=${encodeURIComponent(product._id)}`);
  };
  const fetchProducts = async (id) => {
    try {
      const productsData = await getAllProductsbyCat(id, "5", "1");
      setProducts(productsData.data.data);
    } catch (error) {}
  };

  return (
    <div className="container_cus">
      <div className="product">
        <div className="product_left">
          <div className="large-image">
            <img
              id="zoom_01"
              src={activeImage}
              alt="Product"
              className="img-responsive center-block bk-product-image"
            />
          </div>
          <div className="thumbnail-carousel">
            <button
              onClick={handlePrev}
              disabled={startIndex === 0}
              className="thumbnail-item1"
            >
              Prev
            </button>
            {product?.images
              ?.slice(startIndex, startIndex + 4)
              .map((image, index) => (
                <div key={index} className="thumbnail-item">
                  <img
                    src={image}
                    alt="Thumbnail"
                    onClick={() => setActiveImage(image)}
                  />
                </div>
              ))}
            <button
              onClick={handleNext}
              disabled={startIndex + 4 >= product?.images.length}
              className="thumbnail-item12"
            >
              Next
            </button>
          </div>
        </div>
        <div className="product_right">
          <div className="product_r_name">{product?.name}</div>
          <div className="product_r">
            <span className="product_r_title">Tình trạng:</span>
            <span className="product_r_t">
              {product?.isOutofOrder ? "Out of Order" : "Có sẳn"}
            </span>
          </div>
          <div className="product_r_price">
            {product?.price.toLocaleString()} đ
          </div>
          <div className="product_r product_r_title">
            <span>{product?.description}</span>
          </div>
          <div className="product_r">
            <span className="product_r_title">Xuất sứ:</span>
            <span className="product_r_t">{product?.origin}</span>
          </div>
          <div className="product_r">
            <span className="product_r_title">Danh mục:</span>
            <span className="product_r_t">{product?.Category?.name}</span>
          </div>
          <div className="product_r">
            <span className="product_r_title">Thương hiệu:</span>
            <span className="product_r_t">{product?.Brand?.name}</span>
          </div>
          <div className="product_r_t">
            <div className="product_r_b" onClick={() => addToCart(product)}>
              <span>THÊM VÀO GIỎ HÀNG</span>
            </div>
          </div>
          <div
            className="product_r_icon"
            onClick={() => handleAddToFavorites(product._id)}
          >
            <div className="">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <span>Thêm vào yêu thích</span>
          </div>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <div className="comments-section">
          <h2 className="comments-title">Đánh giá sản phẩm</h2>
          <div>
            {listComment && listComment.length === 0 && (
              <p>Chưa có đánh giá nào. Hãy mua hàng và thực hiện đánh giá!</p>
            )}
            {listComment &&
              listComment.map((comment, key) => {
                return (
                  <div className="comment" key={key}>
                    <div className="comment-header">
                      <img
                        className="comment-avatar"
                        src={comment.user.photo}
                        alt="User1 Avatar"
                      />
                    </div>
                    <div className="comment-body">
                      <div className="comment-info">
                        <span className="comment-user">
                          {comment.user.lastName + " " + comment.user.firstName}
                        </span>
                        <span className="comment-date">
                          {new Date(comment.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <RatingStars
                        setonChange={setRating}
                        number={comment.rating}
                      />
                      <p>{comment.content}</p>

                      {comment.images ? (
                        <img
                          className="comment-img"
                          src={comment.images}
                          alt="Comment Image"
                        />
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                );
              })}
            {iscomment ? (
              <div className="comment1 ">
                <RatingStars setonChange={setRating} />
                <div className="cmt" style={{ outline: "none" }}>
                  <input
                    type="text"
                    onChange={(e) => setContent(e.target.value)}
                  />
                  <div>
                    <label htmlFor="file-upload">
                      <FontAwesomeIcon icon={faLink} />
                    </label>
                    <input
                      id="file-upload"
                      type="file"
                      hidden
                      onChange={(e) => setImage(e.target.files[0])} // Set the image state with the selected file
                    />

                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      onClick={handleSubmitComment}
                    />
                  </div>
                </div>
                {image ? (
                  <img
                    className="comment-img1"
                    src={URL.createObjectURL(image)}
                    alt="Comment Image"
                  />
                ) : null}
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="comments-section1">
          <div>
            <h2 className="comments-title">Sản phẩm</h2>
          </div>
          <div className="comment-item">
            <span className="comment-label">Đánh giá:</span>
            <span className="comment-value">{product?.ratingsAverage} sao</span>
          </div>
          <div className="comment-item">
            <span className="comment-label">Số lượng đánh giá:</span>
            <span className="comment-value">
              {product?.ratingsQuantity} lượt
            </span>
          </div>
          <div className="comment-item">
            <span className="comment-label">Số lượt mua:</span>
            <span className="comment-value">
              {product?.productPurchases} lượt
            </span>
          </div>
          <div className="comment-item">
            <span className="comment-label">Số lượt thích:</span>
            <span className="comment-value">{favorites} lượt</span>
          </div>
          <div className="comment-item">
            <span className="comment-label">Số lượt truy cập:</span>
            <span className="comment-value">{product?.productViews} lượt</span>
          </div>
        </div>
      </div>
      <div>
        <div className="container_cus" style={{ marginTop: "30px" }}>
          <div>
            <h2 className="comments-title" style={{ marginLeft: "10px" }}>
              Sản phẩm cùng danh mục
            </h2>
          </div>
          <div className="cat_list_product">
            {products.map((product, index) => (
              <Item key={index} product={product} />
            ))}
          </div>
          <div className="cat2">
            <div className="cursor background_cl" onClick={handleNavClick}>
              Xem thêm
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
