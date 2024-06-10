import "./App.css";
import img from "./image.png";
const convertDateStringToDate = (dateString) => {
  const date = new Date(dateString); // Tạo một đối tượng Date từ chuỗi thời gian
  const options = { year: "numeric", month: "2-digit", day: "2-digit" }; // Tùy chọn hiển thị ngày
  const formattedDate = date.toLocaleDateString("vi-VN", options); // Chuyển đổi đối tượng Date sang chuỗi ngày
  return formattedDate;
};

const List = ({ item, handleAddVouchers }) => {
  return (
    <div className="coupon-card">
      <img className="logo" src={img} alt="" />
      <h3>{item.name}</h3>
      <h4>
        Giảm {item.amount} cho đơn từ {item.conditions}
      </h4>
      <div className="coupon-row">
        <span className="cpnCode">{item.code}</span>
        <span className="cpnBtn" onClick={() => handleAddVouchers(item._id)}>
          Lưu
        </span>
      </div>
      <p>hạn đên:{convertDateStringToDate(item.expiryDate)}</p>
    </div>
  );
};

export default List;
