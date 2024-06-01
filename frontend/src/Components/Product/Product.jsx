import React, { useEffect, useState } from "react";
import style from "./Product.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../service/userContext"; // Import the custom hook
import { getProductsbyID } from "../../service/API";
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
  }, []);

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
              disabled={startIndex + 4 >= product?.images}
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
            <span className="product_r_t">{product?.isOutofOrder}</span>
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
            <span className="product_r_t">{product?.Category.name}</span>
          </div>
          <div className="product_r">
            <span className="product_r_title">Thương hiệu:</span>
            <span className="product_r_t">{product?.Brand.name}</span>
          </div>
          {/* <div className="product_r">
            <span className="product_r_title">Số lượng:</span>
            <div
              className="product_r_t"
              style={{
                border: "0.1px solid #e7e7e7",
                width: "90px",
                padding: "5px",
              }}
            >
              <div className="CartItembt">-</div>
              <div className="divider"></div>
              <div className="CartItem_">3</div>
              <div className="divider"></div>
              <div className="CartItembt">+</div>
            </div>
          </div> */}
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
    </div>
  );
}

export default Product;
