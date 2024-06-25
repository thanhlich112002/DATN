import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUser, createOrder } from "../../service/API";
import UserInfo from "./UserInfo";
import OrderSummary from "./OrderSummary";
import { useUser } from "../../service/userContext";
import "./Checkout.css";

function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [vouchers, setVouchers] = useState();
  const [openAddress, setOpenAddress] = useState(false);
  const { cart } = useUser();
  const [user, setUser] = useState();
  const [address, setAddress] = useState(null);

  const getUserData = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
      setAddress(res.data.defaultContact);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const Order = async () => {
    try {
      if (vouchers) {
        if (vouchers.conditions > total + vouchers.amount) {
          toast.error("Điều kiện không hợp lệ");
          return;
        }
      }

      const req = await createOrder(total, 29000, address._id, vouchers?._id);
      if (req.data && req.data.order_url) {
        window.location.href = req.data.order_url;
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserData();
  }, [total]);

  useEffect(() => {
    const newSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingFee = 29000;
    const newTotal =
      newSubtotal + shippingFee - (vouchers ? vouchers.amount : 0);
    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }, [cart, vouchers]);

  return (
    <div
      className="container"
      style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}
    >
      <UserInfo
        user={user}
        address={address}
        setAddress={setAddress}
        openAddress={openAddress}
        setOpenAddress={setOpenAddress}
        getUserData={getUserData}
      />
      <div className="col">
        <div>
          <div className="checkout_left_top">
            <span>Vận chuyển</span>
          </div>
          <div className="radio-wrapper">
            <div className="radio__input">
              <input type="radio" className="input-radio" checked={true} />
            </div>
            <label className="radio__label">
              <span>Phí vận chuyển</span>
              <span className="radio__label__accessory">
                <span className="content-box__emphasis price">29.000₫</span>
              </span>
            </label>
          </div>
        </div>
        <div>
          <div className="checkout_left_top">
            <span>Thanh toán</span>
          </div>
          {["Thanh toán qua ZaloPay"].map((option, index) => (
            <div className="radio-wrapper" key={index}>
              <div className="radio__input">
                <input
                  type="radio"
                  className="input-radio"
                  name="payment"
                  value={option}
                  checked={true}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
              </div>
              <label className="radio__label">
                <span>{option}</span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <OrderSummary
        cart={cart}
        subtotal={subtotal}
        total={total}
        vouchers={vouchers}
        setVouchers={setVouchers}
        Order={Order}
      />
    </div>
  );
}

export default Checkout;
