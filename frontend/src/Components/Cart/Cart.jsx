import React from "react";
import style from "./Cart.css";
import CartItem from "./CartItem";
import { useUser } from "../../service/userContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart } = useUser();

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const navigate = useNavigate();

  const handleNav = (nav) => {
    navigate(`${nav}`);
  };

  return (
    <div className="container">
      <div className="Cart">
        <div className="Cart_title">GIỎ HÀNG</div>
        <div className="Cart_body">
          <div className="Cart_left">
            {cart && cart.length > 0 ? (
              cart.map((product, index) => (
                <CartItem key={index} product={product} />
              ))
            ) : (
              <div
                style={{
                  marginTop: "100px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <div style={{ fontSize: "24px" }}>Chưa có sản phẩm nào </div>
                <p
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => {
                    handleNav("/collections");
                  }}
                >
                  tiếp tục mua hàng
                </p>
              </div>
            )}
          </div>

          <div className="Cart_right">
            <div className="Cart1">
              <div className="Cart1_price1">
                <div>Tạm tính:</div>
                <div>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <div className="Cart1_price">
                <div>Tổng tiền:</div>
                <div>
                  {totalPrice.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </div>
              </div>
              <div className="cart1_button">
                <div className="Cart1_item_rigth">
                  <span
                    onClick={() => {
                      handleNav("/checkout");
                    }}
                  >
                    MUA NGAY
                  </span>
                  {/* <FontAwesomeIcon icon={faArrowRight} /> */}
                </div>
              </div>
              <div className="cart1_button">
                <div className="Cart1_item_rigth">
                  <span
                    onClick={() => {
                      handleNav("/collections");
                    }}
                  >
                    TIẾP TỤC MUA HÀNG
                  </span>
                  {/* <FontAwesomeIcon icon={faArrowRight} /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
