import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "./Checkout.css";

function SelectVoucher({ listVouchers, setShowVoucherList, setCode, total }) {
  const handleSelectVoucher = (voucher) => {
    if (total >= voucher.conditions) {
      setCode(voucher.code);
      setShowVoucherList(false);
    }
  };

  return (
    <div className="full">
      <div className="Form_Add">
        <div className="X" onClick={() => setShowVoucherList(false)}>
          <FontAwesomeIcon icon={faTimes} />
        </div>
        <div className="checkout_left_top">
          <span>Lựa chọn phiếu mua hàng</span>
        </div>
        <div className="checkout_left">
          <table className="voucher-table">
            <thead>
              <tr>
                <th>Mã giảm giá</th>
                <th>Giảm giá</th>
                <th>Điều kiện</th>
                <th>Ngày hết hạn</th>
              </tr>
            </thead>
            <tbody>
              {listVouchers.length === 0 ? (
                <tr>
                  <td colSpan="4">Không có phiếu giảm giá nào được lưu</td>
                </tr>
              ) : (
                listVouchers.map((voucher) => (
                  <tr
                    className={`tb ${
                      total < voucher.conditions ? "disabled" : ""
                    }`}
                    key={voucher._id}
                    onClick={() => handleSelectVoucher(voucher)}
                  >
                    <td>{voucher.code}</td>
                    <td>{voucher.amount.toLocaleString()}đ</td>
                    <td>{voucher.conditions.toLocaleString()}đ</td>
                    <td>{new Date(voucher.expiryDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default SelectVoucher;
