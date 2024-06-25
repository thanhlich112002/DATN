import React, { useEffect } from "react";
import style from "./style.css";

function Gioithieu() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="container_cus">
      <div className="containerit">
        <h2>
          TRẢI NGHIỆM NHỮNG CẢM XÚC MÙI HƯƠNG ĐẦY THI VỊ CÙNG LUXURY PERFUMES
        </h2>
        <p>
          Hơn cả thơm & đẹp, nước hoa chính là cá tính và dấu ấn của mỗi người.
          Hãy chọn Luxury Perfumes - chọn lấy những mùi hương nâng niu cảm xúc
          tự do, mạnh mẽ và cả những yêu thương từ trái tim mình bạn nhé! Hương
          thơm sẽ luôn để lại những ký ức thi vị trong ta...
        </p>
        <div className="image-container">
          <div>
            <img
              src="https://curnonwatch.com/blog/wp-content/uploads/2022/10/nuoc-hoa-nam-mua-xuan-1-1140x641.jpg"
              alt="Hello world"
            />
          </div>
          <i>Có một Luxury Perfumes rất đời và rất thơ giữa lòng Đà Nẵng</i>
        </div>
        <h3>Có một Luxury Perfumes rất ĐỜI mà cũng rất THƠ</h3>
        <div>
          <p>
            {" "}
            Bạn thường tìm kiếm điều gì ở một shop nước hoa chính hãng? Những
            sản phẩm chính hãng? Một mùi hương khiến bạn hài lòng? Hay một sản
            phẩm với mức giá hợp lý? Hơn cả những điều đó, Luxury Perfumes muốn
            mang đến cho bạn những trải nghiệm cảm xúc tuyệt vời cùng mùi hương.
          </p>
          <ul>
            <li>
              <i className="fa-regular fa-lightbulb"></i>
              Để một ngày vui, bạn vẫn tự tin bước ra ngoài với phong thái đầy
              cá tính.
            </li>
            <li>
              <i className="fa-regular fa-lightbulb"></i>
              Để một ngày buồn, bạn đóng gói nỗi buồn kia thả vào một khoảng
              lặng yên bình trôi đi mất.
            </li>
            <li>
              <i className="fa-regular fa-lightbulb"></i>
              Để một ngày yêu, bạn cuồng nhiệt và cháy hết mình cho những hòa
              quyện thăng hoa.
            </li>
            <li>
              <i className="fa-regular fa-lightbulb"></i>
              Và để một ngày thật bình thường trôi qua, bạn vẫn là chính mình,
              vẫn đậm chất ĐỜI và đậm chất THƠ theo cách của riêng mình...
            </li>
          </ul>
        </div>
        <div>
          <h3>
            Vì sao Luxury Perfumes xứng đáng để đồng hành với bạn trên con đường
            trải nghiệm những cảm xúc mùi hương đầy thi vị này?
          </h3>
          <ul>
            <li>
              1. Luxury Perfumes luôn tìm kiếm những nguồn cung cấp nước hoa
              chất lượng và đảm bảo là nước hoa chính hãng đến tay khách hàng
              với chi phí tốt nhất.
            </li>
            <li>
              2. Luxury Perfumes 100% nói KHÔNG với nước hoa là hàng giả/ hàng
              nhái (fake).
            </li>
            <li>
              3. Luxury Perfumes 100% nói KHÔNG với "bán hàng bất chấp" và "cạnh
              tranh không lành mạnh" với các bạn cửa hàng/ đơn vị kinh doanh sản
              phẩm tương tự trên thị trường hiện nay.
            </li>
            <li>
              4. Luxury Perfumes có cửa hàng xinh xắn để bạn được tự do thử mùi,
              test sản phẩm và thư giãn trong thế giới mùi hương của riêng mình.
            </li>
            <li>
              5. Luxury Perfumes có Chính sách thanh toán/ vận chuyển/ đổi
              trả... được quy định cụ thể trên website Luxury Perfumes.vn.
            </li>
            <li>
              6. Luxury Perfumes trân trọng từng cảm xúc của bạn như cảm xúc của
              chính mình, thế thôi!
            </li>
          </ul>
        </div>
        <p>
          Luxury Perfumes cũng như bạn, chúng ta chỉ có một cuộc đời và một
          khoảng thời gian nhất định của tuổi trẻ. Điều duy nhất Luxury Perfumes
          mong bạn sẽ không bao giờ đánh mất đi chính là bản thân mình. Dám sai
          và can đảm nhận sai. Dám đúng và khẳng định với mọi người rằng tôi
          đúng. Dám ra quyết định và chịu trách nhiệm trước những quyết định của
          mình.
        </p>
        <p>Đó thật sự là những cảm xúc tuyệt vời của tuổi thanh xuân!</p>
        <div>
          <h4>Trân trọng,</h4>
          <h4>Đội ngũ Luxury Perfumes.</h4>
        </div>
      </div>
    </div>
  );
}

export default Gioithieu;
