import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Checkout.css";
import { useUser } from "../../service/userContext";
import { useAuth } from "../../service/authContext";
import {
  getUser,
  createOrder,
  getVouchersbyCode,
  getVouchersbyUser,
} from "../../service/API";
import { toast } from "react-toastify";

function Checkout() {
  const [selectedPayment, setSelectedPayment] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [listVouchers, setListVouchers] = useState([]);
  const { cart } = useUser();
  const [user, setUser] = useState();
  const [address, setAddress] = useState(null);
  const [vouchers, setVouchers] = useState();
  const [code, setCode] = useState("");
  const getUserData = async () => {
    try {
      const res = await getUser();
      setUser(res.data);
      console.log(address);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  const getVoucher = async (code) => {
    try {
      setVouchers(null);
      const res = await getVouchersbyCode(code);
      setVouchers(res.data);
      console.log(address);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  // const getListVouchers = async (data) => {
  //   try {
  //     setVouchers(null);
  //     const res = await getVouchersbyUser(data);
  //     setListVouchers(res.data);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };
  const Order = async () => {
    try {
      if (vouchers) {
        if (vouchers.conditions > total + vouchers.amount) {
          toast.error("Vui lòng chọn lại voucher");
          return;
        }
      }
      const req = await createOrder(total, 29000, address._id, vouchers?._id);
      if (req.data && req.data.order_url) {
        window.location.href = req.data.order_url;
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getAddress = (id) => {
    console.log(id);
    const defaultContactId = id;
    const address = user?.contact.find(
      (contact) => contact._id === defaultContactId
    );
    console.log(address);
    setAddress(address);
  };
  useEffect(() => {
    getUserData();
    // getListVouchers({ tatolprice: total });
  }, [total]);
  useEffect(() => {
    getAddress(user?.defaultContact);
  }, [user]);

  useEffect(() => {
    // Calculate subtotal and total
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
      <div class="col">
        <div>
          <div className="checkout_left_top">
            <span>Thông tin mua hàng</span>
          </div>
          <div className="checkout_left">
            <div class="field__input-wrapper">
              <label for="name" class="field__label">
                Họ và Tên
              </label>
              <input
                name="name"
                id="name"
                type="text"
                class="field__input"
                data-bind="name"
                value={user?.lastName + " " + user?.firstName}
              />
            </div>
            <div class="field__input-wrapper">
              <label for="email" class="field__label">
                Email (tùy chọn)
              </label>
              <input
                name="email"
                id="email"
                type="email"
                class="field__input"
                data-bind="email"
                value={user?.email}
              />
            </div>
          </div>
          <div className="checkout_left_top">
            <span>Địa chỉ mặc định</span>
          </div>
          <div className="checkout_left">
            <div class="field__input-wrapper">
              <label for="province" class="field__label">
                Chọn địa chỉ
              </label>
              <select
                name="phone_number"
                id="phone_number"
                class="field__input"
                data-bind="province"
                onChange={(e) => getAddress(e.target.value)}
              >
                {user?.contact?.map((contact) => (
                  <option key={contact._id} value={contact._id}>
                    {contact.address}
                  </option>
                ))}
              </select>
            </div>
            <div class="field__input-wrapper">
              <label for="phone" class="field__label">
                Số điện thoại
              </label>
              <input
                name="address"
                id="address"
                type="tel"
                class="field__input"
                data-bind="phone"
                value={address?.phoneNumber}
              />
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div>
          <div className="checkout_left_top">
            <span>Vận chuyển</span>
          </div>
          <div class="radio-wrapper">
            <div class="radio__input">
              <input type="radio" class="input-radio" checked={true} />
            </div>
            <label class="radio__label">
              <span>
                <span>Phí vận chuyển</span>
              </span>
              <span class="radio__label__accessory">
                <span class="content-box__emphasis price">29.000₫</span>
              </span>
            </label>
          </div>
        </div>
        <div>
          <div className="checkout_left_top">
            <span>Thanh toán</span>
          </div>{" "}
          {["Thanh toán qua MoMo"].map((option, index) => (
            <div class="radio-wrapper">
              <div class="radio__input">
                <input
                  type="radio"
                  className="input-radio"
                  name="payment"
                  value={option}
                  checked={true}
                  onChange={(e) => setSelectedPayment(e.target.value)}
                />
              </div>
              <label class="radio__label">
                <span>
                  <span>{option}</span>
                </span>
              </label>
            </div>
          ))}
        </div>
      </div>
      <div class="col">
        <div class="">
          <div class="checkout_left_top">
            <span>Đơn hàng ({cart.length} sản phẩm)</span>
          </div>
        </div>
        <div class="scrollable-table">
          <table class="productck-table">
            <tbody>
              {cart.map((item, key) => (
                <tr class="productck">
                  <td class="product__image">
                    <div class="productck-thumbnail">
                      <div
                        class="productck-thumbnail__wrapper"
                        data-tg-static=""
                      >
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          class="productck-thumbnail__image"
                        />
                      </div>
                      <span class="productck-thumbnail__quantity">
                        {item.quantity}
                      </span>
                    </div>
                  </td>
                  <th class="product__description">
                    <span class="product__description__name">{item.name}</span>

                    <span class="product__description__property">
                      {item.Category.name + "/" + item.Brand.name}
                    </span>
                  </th>
                  <td class="product__price">{item.price.toLocaleString()}₫</td>{" "}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{ marginTop: "10px", paddingBottom: "10px" }}
          className="border-bottom"
        >
          <div class="field__input-wrapper">
            <label for="reductionCode" class="field__label">
              Nhập mã giảm giá
            </label>
            <input
              type="text"
              class="field__input"
              onChange={(e) => setCode(e.target.value)}
              value={code}
            />
            <div
              className="btn_code cursor"
              onClick={() => {
                getVoucher(code);
              }}
            >
              Áp dụng
            </div>
            <div
              className="btn_code cursor"
              onClick={() => {
                getVoucher(code);
              }}
            >
              Chọn mã
            </div>
          </div>
        </div>

        <div>
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "10px",
              }}
            >
              <th class="total-line__name" style={{ color: " #717171" }}>
                Tạm tính
              </th>
              <td class="total-line__price">{subtotal.toLocaleString()}₫</td>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "20px",
              }}
              className="border-bottom"
            >
              <th class="total-line__name" style={{ color: " #717171" }}>
                Phí vận chuyển
              </th>
              <td class="total-line__price">29.000₫</td>
            </div>
            {vouchers ? (
              <>
                {" "}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "20px",
                  }}
                  className="border-bottom"
                >
                  <th class="total-line__name" style={{ color: " #717171" }}>
                    Giảm giá
                  </th>
                  <td class="total-line__price">
                    {vouchers.amount.toLocaleString()}đ
                  </td>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingBottom: "20px",
                  }}
                  className="border-bottom"
                >
                  <th class="total-line__name" style={{ color: " #717171" }}>
                    Điều kiện
                  </th>
                  <td class="total-line__price">
                    {vouchers.conditions.toLocaleString()}đ
                  </td>
                </div>
              </>
            ) : (
              <></>
            )}

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "20px",
              }}
            >
              <th class="total-line__name">
                <span
                  class="payment-due__label-total"
                  style={{ color: " #717171" }}
                >
                  Tổng cộng
                </span>
              </th>
              <td class="total-line__price">
                <span
                  class="payment-due__price"
                  data-bind="getTextTotalPrice()"
                >
                  {total.toLocaleString()}₫
                </span>
              </td>
            </div>
          </div>
          <div className="checkout_pay">
            <a href="/cart">
              <i>❮</i>
              <span>Quay về giỏ hàng</span>
            </a>
            <div style={{ cursor: "pointer" }}>
              <span onClick={() => Order()}>ĐẶT HÀNG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
