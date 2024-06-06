import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import Detailproduct from "../Detailproduct/Detailproduct";
import { useNavigate } from "react-router-dom";
import { addFavorite } from "../../service/API";

function Item({ product }) {
  const navigate = useNavigate();

  const handleNav = (nav) => {
    navigate(`/product/${nav}`);
  };
  const [detail, setDetail] = useState(false);
  return (
    <div className="item">
      {detail ? <Detailproduct item={product} setDetail={setDetail} /> : <></>}
      <div className="item_img" onClick={() => handleNav(product._id)}>
        <img src={product?.images} alt={product?.name} />
      </div>
      <div className="item_name" onClick={() => handleNav(product._id)}>
        {product?.name}
      </div>
      <div className="item_bottom">
        <div className="item_price">{product?.price} đ</div>
        <div className="item_icons">
          <div>
            <FontAwesomeIcon icon={faCartPlus} />
          </div>
          <div>
            <FontAwesomeIcon icon={faEye} onClick={() => setDetail(true)} />
          </div>
          <div>
            <FontAwesomeIcon
              icon={faHeart}
              onClick={() => addFavorite(product._id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
