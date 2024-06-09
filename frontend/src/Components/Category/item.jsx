import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.css";
import Detailproduct from "../Detailproduct/Detailproduct";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../../service/API";
import { useUser } from "../../service/userContext";
import { useAuth } from "../../service/authContext";

function Item({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useUser();
  const { isLoggedIn, user } = useAuth();

  const handleNav = (nav) => {
    navigate(`/product/${nav}`);
  };

  const [detail, setDetail] = useState(false);

  const handleAddToFavorites = (productId) => {
    addFavorite(productId);
    toast.success("Đã thêm vào yêu thích!");
  };
  const formatPrice = (price) => {
    // Sử dụng hàm Intl.NumberFormat để định dạng số tiền với ngôn ngữ và kiểu định dạng mong muốn
    const formatter = new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    });
    // Trả về chuỗi đã định dạng
    return formatter.format(price);
  };

  return (
    <div className="item">
      {detail ? <Detailproduct item={product} setDetail={setDetail} /> : <></>}
      <div className="item_img" onClick={() => handleNav(product._id)}>
        <img src={product?.images[0]} alt={product?.name} />
      </div>
      <div className="item_name" onClick={() => handleNav(product._id)}>
        <span className="clamp-2">{product?.name}</span>
      </div>

      <div className="item_bottom">
        <div className="item_price">{formatPrice(product?.price)}</div>
        <div className="item_icons">
          <div>
            <FontAwesomeIcon
              icon={faCartPlus}
              onClick={() => addToCart(product)}
            />
          </div>
          <div>
            <FontAwesomeIcon icon={faEye} onClick={() => setDetail(true)} />
          </div>
          {isLoggedIn ? (
            <div>
              <FontAwesomeIcon
                icon={faHeart}
                onClick={() => handleAddToFavorites(product._id)}
              />
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Item;
