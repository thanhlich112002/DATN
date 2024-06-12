import React, { useEffect, useState } from "react";
import "./Voucher.css";
import { getAllVouchers, createVoucher } from "../../service/userService";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import TopTable from "../component/TopTable/TopTable";

const VoucherDisplay = ({ voucher, onSave }) => {
  return (
    <div className="voucher-container">
      <h2 className="voucher-heading">Phiếu Giảm Giá</h2>
      <div className="voucher-field">
        <strong>Mã:</strong> {voucher.code}
      </div>

      <div className="voucher-field">
        <strong>Số Tiền Giảm Giá:</strong> {voucher.amount} VND
      </div>
      <div className="voucher-field">
        <strong>Điều Kiện Áp Dụng:</strong> Đơn hàng tối thiểu{" "}
        {voucher.conditions} VND
      </div>
      <div className="voucher-field">
        <strong>Ngày Hết Hạn:</strong>{" "}
        {new Date(voucher.expiryDate).toLocaleDateString()}
      </div>
      <div className="voucher-field">
        <strong>Số Lượng:</strong> {voucher.quantity}
      </div>
      <button className="save-button" onClick={onSave}>
        Hủy
      </button>
    </div>
  );
};

const VoucherForm = ({ onSave, setIsOpen }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [conditions, setConditions] = useState(0);
  const [expiryDate, setExpiryDate] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isAvailable, setIsAvailable] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newVoucher = {
      code,
      name,
      amount,
      conditions,
      expiryDate,
      quantity,
      isAvailable,
    };
    console.log(newVoucher);
    try {
      const req = await createVoucher(newVoucher);
      toast.success("Thêm phiếu giảm giá thành công");
    } catch (err) {
      toast.error(err.data.message);
    }
    setIsOpen(false);
  };

  return (
    <div className="vouadd">
      <div className="form-container1" style={{ position: "relative" }}>
        <div className="X" onClick={() => setIsOpen(false)}>
          x
        </div>
        <h2 className="voucher-heading">Thêm Phiếu Giảm Giá</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Mã</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Tên</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Số Tiền Giảm Giá (VND)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Điều Kiện Áp Dụng (VND)</label>
            <input
              type="number"
              value={conditions}
              onChange={(e) => setConditions(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Ngày Hết Hạn</label>
            <input
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label>Số Lượng</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="add-button">
            Lưu
          </button>
        </form>
      </div>
    </div>
  );
};

function Voucher() {
  const [vouchers, setVouchers] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const GetVoucher = async () => {
    const req = await getAllVouchers();
    setVouchers(req.data);
  };

  useEffect(() => {
    GetVoucher();
  }, []);

  const handleSave = () => {
    GetVoucher();
    alert("Phiếu giảm giá đã được lưu!");
  };

  return (
    <div className="projects">
      <div className="voucher_contai">
        <div className="card-header">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              borderRadius: "5px",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                width: "100px",
                height: "100px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FontAwesomeIcon
                icon={faBookmark}
                fontSize={70}
                color="#C0C0C0"
              />
            </div>
            <span>Quản lý giảm giá</span>
          </div>
          <button className="background_cl" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "Đóng form" : "Thêm phiếu giảm giá"}
          </button>
        </div>
        <TopTable />
        {isOpen && <VoucherForm onSave={handleSave} setIsOpen={setIsOpen} />}
        <div className="voucher-grid">
          {vouchers?.map((voucher, index) => (
            <div>
              <VoucherDisplay
                key={index}
                voucher={voucher}
                onSave={handleSave}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Voucher;
