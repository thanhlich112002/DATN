import React from "react";
import Title from "./Title/Title";
import "./Cart.css"; // Đảm bảo import CSS một cách chính xác
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faMinus,
  faPlus,
  faTrash,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function Cart({ cartItem, addToCart, removeToCart, UpToCart }) {
  function formatCurrency(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  const cartItems = [
    {
      id: 1,
      name: "Nước hoa nam cao cấp",
      price: 500000,
      quantity: 1,
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSonfxjxQicX5UFPczdZIcv6EAG5suvd83yeG2x829CCg&s",
      noti: "Hương thơm nam tính, lịch lãm",
    },
    {
      id: 1,
      name: "Nước hoa nam cao cấp",
      price: 500000,
      quantity: 1,
      images:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSonfxjxQicX5UFPczdZIcv6EAG5suvd83yeG2x829CCg&s",
      noti: "Hương thơm nam tính, lịch lãm",
    },
  ];

  const totalPrice = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const navigate = useNavigate();

  const handleNav = (nav) => {
    navigate(`/${nav}`);
  };

  return (
    <div>
      <div className="min-height">
        <div className="scroll">
          {cartItems.length > 0 ? (
            <>
              {cartItems.map((product, index) => (
                <div className="cart" key={index}>
                  <div className="item0">
                    <img src={product.images} alt="" />
                  </div>
                  <div className="item2">
                    {product.name}
                    <div className="item2_decrip">Ghi chú : {product.noti}</div>
                  </div>
                  <div className="item0">{formatCurrency(product.price)}</div>
                  <div className="item3" style={{ color: "#4f4f4f" }}>
                    <FontAwesomeIcon icon={faTrash} />
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="cart_no">
              Rất tiếc!!! Bạn không có sản phẩm ở đây.
            </div>
          )}
        </div>
        <div className="cart1">
          <div className="cart1_price">
            <div>Tổng tiền:</div>
            <div style={{ color: "red", marginLeft: "20px" }}>
              {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
          <div className="cart1_button" onClick={() => handleNav("pizza")}>
            <div className="cart1_item_rigth">
              <span>Tiếp tục mua hàng</span>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
