import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Checkout.css";
import { useUser } from "../../service/userContext"; 
import { useAuth } from "../../service/authContext";

function Checkout() {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const { cart } = useUser();
  const { isLoggedIn, setIsLoggedIn, user } = useAuth();

  useEffect(() => {
    axios
      .get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      )
      .then((response) => {
        setCities(response.data);
      });
  }, []);

  useEffect(() => {
    if (selectedCity) {
      const city = cities.find((city) => city.Id === selectedCity);
      setDistricts(city.Districts);
    } else {
      setDistricts([]);
    }
    setWards([]);
  }, [selectedCity]);

  useEffect(() => {
    if (selectedDistrict) {
      const district = districts.find(
        (district) => district.Id === selectedDistrict
      );
      setWards(district.Wards);
    } else {
      setWards([]);
    }
  }, [selectedDistrict]);

  useEffect(() => {
    // Calculate subtotal and total
    const newSubtotal = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const shippingFee = 29000; // Shipping fee in VND
    const newTotal = newSubtotal + shippingFee;

    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }, [cart]);

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
            <span>Thông tin mua hàng</span>
          </div>
          <div className="checkout_left">
            <div class="field__input-wrapper">
              <label for="phone" class="field__label">
                Số điện thoại
              </label>
              <input
                name="phone"
                id="phone"
                type="tel"
                class="field__input"
                data-bind="phone"
                value={user?.contact[0].phoneNumber}
              />
            </div>
            <div class="field__input-wrapper">
              <label for="province" class="field__label">
                Chọn tỉnh
              </label>
              <select
                name="province"
                id="province"
                class="field__input"
                data-bind="province"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map((city) => (
                  <option key={city.Id} value={city.Id}>
                    {city.Name}
                  </option>
                ))}
              </select>
            </div>
            <div class="field__input-wrapper">
              <label for="district" class="field__label">
                Chọn huyện
              </label>
              <select
                name="district"
                id="district"
                class="field__input"
                data-bind="district"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
              >
                {districts.map((district) => (
                  <option key={district.Id} value={district.Id}>
                    {district.Name}
                  </option>
                ))}
              </select>
            </div>
            <div class="field__input-wrapper">
              <label for="ward" class="field__label">
                Chọn phường xã
              </label>
              <select
                name="ward"
                id="ward"
                class="field__input"
                data-bind="ward"
              >
                {wards.map((ward) => (
                  <option key={ward.Id} value={ward.Id}>
                    {ward.Name}
                  </option>
                ))}
              </select>
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
              <input type="radio" class="input-radio" />
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
          {[
            "Thanh toán qua VNPAY-QR",
            "Thanh toán qua MoMo",
            "Thanh toán qua ZaloPay",
            "Thanh toán khi nhận hàng (COD)",
            "Thanh toán qua thẻ ngân hàng",
          ].map((option, index) => (
            <div class="radio-wrapper">
              <div class="radio__input">
                <input
                  type="radio"
                  className="input-radio"
                  name="payment"
                  value={option}
                  checked={selectedPayment === option}
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
            <input type="text" class="field__input" />
            <div className="btn_code">Áp dụng</div>
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
              <span>ĐẶT HÀNG</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
