import React, { useRef, useEffect } from "react";
import "./Cart.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../service/userContext";
import { useAuth } from "../../service/authContext";

function Cart({ setIsopencart }) {
  const { cart, removeFromCart, addToCart } = useUser();
  const { isLoggedIn } = useAuth();
  const ref = useRef(null);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsopencart(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function formatCurrency(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const totalPrice = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const navigate = useNavigate();

  const handleNav = (nav) => {
    setIsopencart(false);
    navigate(`/${nav}`);
  };

  return (
    <div>
      <div className="min-height" ref={ref}>
        <div className="scroll">
          {cart.length > 0 ? (
            <>
              {cart.map((product, index) => (
                <div className="cart" key={index}>
                  <div className="item0">
                    <img src={product.images[0]} alt="" />
                  </div>
                  <div className="item2">
                    {product.name}
                    <div className="item0">{formatCurrency(product.price)}</div>
                  </div>

                  <div className="item3" style={{ color: "#4f4f4f" }}>
                    <div className="CartItem_end">
                      <div
                        className="CartItembt"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeFromCart(product);
                        }}
                      >
                        -
                      </div>
                      <div className="divider"></div>
                      <div className="CartItem_">{product.quantity}</div>
                      <div className="divider"></div>
                      <div
                        className="CartItembt"
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                      >
                        +
                      </div>
                    </div>
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
            <div style={{ marginLeft: "20px" }}>
              {totalPrice.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </div>
          </div>
          {isLoggedIn ? (
            <div className="cart1_button">
              <div
                className="cart1_item_rigth"
                onClick={() => {
                  handleNav("collections");
                  setIsopencart(false);
                }}
              >
                <span>QUAY LẠI MUA HÀNG</span>
              </div>
              <div
                className="cart1_item_rigth"
                onClick={() => {
                  handleNav("cart");
                  setIsopencart(false);
                }}
              >
                <span>THANH TOÁN</span>
              </div>
            </div>
          ) : (
            <>
              <div
                style={{ display: "flex", justifyContent: "center" }}
                onClick={() => handleNav("login")}
              >
                <span
                  style={{ display: "flex", margin: "10px", fontSize: "20px" }}
                >
                  Đăng nhập để mua hàng
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
