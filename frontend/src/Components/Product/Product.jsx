import React, { useEffect, useState } from "react";
import style from "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../service/userContext"; // Import the custom hook
import { getProductsbyID, createComment } from "../../service/API";
import { useParams } from "react-router-dom";

function Product() {
  const { addToCart } = useUser();
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState(null);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProductsbyID(id);
        setProduct(productData.data.data[0]);
        console.log(productData.data.data[0]);
        setActiveImage(productData.data.data[0]?.images[0]);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [id]);

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
    const formData = new FormData(event.target);
    try {
      await createComment(formData, product._id);
      alert("Comment submitted successfully!");
      event.target.reset();
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment.");
    }
  };

  return (
    <div className="container">
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
              {product?.isOutofOrder ? "Out of Order" : "Available"}
            </span>
          </div>
          <div className="product_r_price">{product?.price} đ</div>
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
            <div className="product_r_b">
              <span>MUA NGAY</span>
            </div>
            <div className="product_r_b" onClick={() => addToCart(product)}>
              <span>THÊM VÀO GIỎ HÀNG</span>
            </div>
          </div>
          <div className="product_r_icon">
            <div className="">
              <FontAwesomeIcon icon={faHeart} />
            </div>
            <span>Thêm vào yêu thích</span>
          </div>
        </div>
      </div>
      <div className="comments-section">
        <h2 className="comments-title">Comments</h2>
        <div className="comment">
          <div className="comment-header">
            <img
              className="comment-avatar"
              src="https://res.cloudinary.com/dzy3cnyb6/image/upload/v1716368308/perfume/ydttzqxmuoyzcyekd9zr.png"
              alt="User1 Avatar"
            />
            <div className="comment-info">
              <span className="comment-user">User1</span>
              <span className="comment-date">2024-06-03</span>
            </div>
          </div>
          <div className="comment-body">
            <p>
              This is a sample comment. It contains some text and maybe an
              image.
            </p>
            <img
              className="comment-img"
              src="https://res.cloudinary.com/dzy3cnyb6/image/upload/v1716368308/perfume/ydttzqxmuoyzcyekd9zr.png"
              alt="Comment Image"
            />
          </div>
        </div>
      </div>
      <div className="comment comments-section">
        <form className="comment-form" onSubmit={handleSubmitComment}>
          <div className="comment-title">Đánh giá sản phẩm</div>
          <textarea
            name="comment"
            placeholder="Nhập bình luận"
            required
          ></textarea>
          <div className="file-input">
            <FontAwesomeIcon icon={faUpload} size="2x" className="ic" />
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              style={{ display: "none" }}
            />
          </div>
          <button type="submit1">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Product;
