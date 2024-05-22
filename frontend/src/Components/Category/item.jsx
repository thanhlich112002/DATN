import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import "./style.css"; // Đảm bảo rằng bạn đã tạo file CSS và import đúng cách

function Item() {
  return (
    <div className="item">
      <div className="item_img">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSonfxjxQicX5UFPczdZIcv6EAG5suvd83yeG2x829CCg&s"
          alt="Dior Sauvage EDP"
        />
      </div>
      <div className="item_name">Dior Sauvage EDP</div>
      <div className="item_bottom">
        <div className="item_price">300.000đ - 500.000đ</div>
        <div className="item_icons">
          <div>
            <FontAwesomeIcon icon={faCartPlus} />
          </div>
          <div>
            <FontAwesomeIcon icon={faEye} />
          </div>
          <div>
            <FontAwesomeIcon icon={faHeart} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
