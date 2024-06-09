import React from "react";
import "./Brand.css"; // File CSS để tùy chỉnh giao diện
import { useNavigate } from "react-router-dom";

const CompanyIntroduction = () => {
  const navigate = useNavigate(); // Khởi tạo hàm navigate

  // Hàm xử lý khi người dùng nhấn vào nút "Xem Thêm"
  const onViewMoreClicked = () => {
    // Chuyển hướng đến trang web chính của công ty
    navigate("/introduce");
  };

  return (
    <div className="container">
      <div className="company-introduction">
        <div className="company-info">
          <h1 style={{ fontSize: "28px" }}>Luxury Perfumes</h1>
          <p>
            Luxury Perfumes tự hào là một trong những cửa hàng bán nước hoa uy
            tín và hàng đầu trên thị trường. Với hơn một thập kỷ hoạt động,
            chúng tôi đã xây dựng được một danh tiếng vững chắc trong cộng đồng
            yêu nước hoa.
          </p>
          <p>
            Tại Luxury Perfumes, chúng tôi chọn lựa các sản phẩm từ những thương
            hiệu nước hoa danh tiếng nhất trên thế giới, mang lại cho khách hàng
            sự đa dạng và chất lượng tốt nhất. Chúng tôi cam kết cung cấp những
            sản phẩm chính hãng, an toàn và đáng tin cậy cho mọi khách hàng.
          </p>
          <p>
            Bên cạnh việc cung cấp các sản phẩm nước hoa, Luxury Perfumes còn là
            địa chỉ tin cậy cho các dịch vụ tư vấn chuyên nghiệp. Đội ngũ nhân
            viên tận tâm và giàu kinh nghiệm của chúng tôi sẽ giúp bạn chọn lựa
            được mùi hương phù hợp nhất với phong cách và cá nhân của bạn.
          </p>
          <p>
            Chúng tôi rất mong được chào đón bạn tại Luxury Perfumes, nơi bạn có
            thể trải nghiệm sự hòa quyện giữa hương thơm tinh tế và dịch vụ
            chuyên nghiệp!
          </p>
          <p
            style={{ color: "blue", cursor: "pointer" }}
            onClick={onViewMoreClicked}
          >
            Xem Thêm
          </p>
          <p>Địa chỉ: Kiệt 82/32, Nguyễn Lường Bằng, Đà Nẵng</p>
          <p>Điện thoại: 0776230217</p>
          <p>Email: nguyenthanhlich112002@gmail.com</p>
        </div>
        <div className="company-contact">
          <img
            src="https://res.cloudinary.com/dzy3cnyb6/image/upload/v1717603819/perfume/okulddba5rdzsy3io1do.jpg"
            alt="Công ty"
          />
        </div>
      </div>
    </div>
  );
};

export default CompanyIntroduction;
