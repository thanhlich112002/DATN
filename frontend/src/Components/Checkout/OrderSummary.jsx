import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getVouchersbyCode, getVouchersbyUser } from "../../service/API";
import SelectVoucher from "./SelectVocher";

function OrderSummary({ cart, subtotal, total, vouchers, setVouchers, Order }) {
  const [code, setCode] = useState("");
  const [listVouchers, setListVouchers] = useState([]);
  const [showVoucherList, setShowVoucherList] = useState(false); // State để hiển thị danh sách voucher

  const getVoucher = async (code) => {
    try {
      setVouchers(null);
      const res = await getVouchersbyCode(code);
      setVouchers(res.data);
    } catch (error) {
      console.error("Error fetching voucher data:", error);
    }
  };

  const getListVouchers = async () => {
    try {
      setVouchers(null);
      const res = await getVouchersbyUser();
      setListVouchers(res.data);
      setShowVoucherList(true);
    } catch (error) {
      console.error("Error fetching vouchers list:", error);
    }
  };

  return (
    <div className="col">
      <div>
        <div className="checkout_left_top">
          <span>Đơn hàng ({cart.length} sản phẩm)</span>
        </div>
      </div>
      <div className="scrollable-table">
        <table className="productck-table">
          <tbody>
            {cart.map((item, key) => (
              <tr className="productck" key={key}>
                <td className="product__image">
                  <div className="productck-thumbnail">
                    <div className="productck-thumbnail__wrapper">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="productck-thumbnail__image"
                      />
                    </div>
                    <span className="productck-thumbnail__quantity">
                      {item.quantity}
                    </span>
                  </div>
                </td>
                <th className="product__description">
                  <span className="product__description__name">
                    {item.name}
                  </span>
                  <span className="product__description__property">
                    {item.Category.name + "/" + item.Brand.name}
                  </span>
                </th>
                <td className="product__price">
                  {item.price.toLocaleString()}₫
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Phần nhập mã giảm giá */}
      <div style={{ display: "flex", gap: " 5px" }}>
        <div className="field__input-wrapper" style={{ flex: 3 }}>
          <label htmlFor="reductionCode" className="field__label">
            Nhập mã giảm giá
          </label>
          <input
            type="text"
            className="field__input"
            onChange={(e) => setCode(e.target.value)}
            value={code}
          />
          <div className="btn_code cursor" onClick={() => getVoucher(code)}>
            Áp dụng
          </div>
        </div>
        {/* Nút hiển thị danh sách voucher */}
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#07503d",
            padding: "10px 20px",
            borderRadius: "2px",
            color: "#ffffff",
            cursor: "pointer",
            borderRadius: "5px",
          }}
          onClick={() => getListVouchers()}
        >
          Mã đã lưu
        </div>
      </div>

      {showVoucherList && (
        <SelectVoucher
          listVouchers={listVouchers}
          setVouchers={setVouchers}
          setShowVoucherList={setShowVoucherList}
          total={total}
          setCode={setCode}
        />
      )}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <th className="total-line__name" style={{ color: " #717171" }}>
            Tạm tính
          </th>
          <td className="total-line__price">{subtotal.toLocaleString()}₫</td>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "20px",
          }}
          className="border-bottom"
        >
          <th className="total-line__name" style={{ color: " #717171" }}>
            Phí vận chuyển
          </th>
          <td className="total-line__price">29.000₫</td>
        </div>
        {/* Hiển thị thông tin giảm giá từ voucher */}
        {vouchers && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: "20px",
              }}
              className="border-bottom"
            >
              <th className="total-line__name" style={{ color: " #717171" }}>
                Giảm giá
              </th>
              <td className="total-line__price">
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
              <th className="total-line__name" style={{ color: " #717171" }}>
                Điều kiện
              </th>
              <td className="total-line__price">
                {vouchers.conditions.toLocaleString()}đ
              </td>
            </div>
          </>
        )}
        {/* Hiển thị tổng tiền thanh toán */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "20px",
          }}
        >
          <th className="total-line__name">
            <span
              className="payment-due__label-total"
              style={{ color: " #717171" }}
            >
              Tổng cộng
            </span>
          </th>
          <td className="total-line__price">
            <span className="payment-due__price">
              {total.toLocaleString()}₫
            </span>
          </td>
        </div>
      </div>

      {/* Nút quay về giỏ hàng và nút đặt hàng */}
      <div className="checkout_pay">
        <a href="/cart">
          <i>❮</i>
          <span>Quay về giỏ hàng</span>
        </a>
        <div onClick={() => Order()} style={{ cursor: "pointer" }}>
          <span>ĐẶT HÀNG</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
