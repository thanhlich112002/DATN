import React from "react";
import "./Slider.css"; // Đảm bảo bạn đã kiểm tra Slider.css không ghi đè kiểu dáng
import Slider from "react-slick";
import styled from "styled-components";

const WrapperSliderStyle = styled(Slider)`
  & .slick-slide > div {
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 450px;
  }
`;

const SimpleSlider = ({ arrImages }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    className: "center",
    centerPadding: "150px",
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className="slider-container" style={{ marginTop: "10px" }}>
      <WrapperSliderStyle {...settings}>
        {arrImages.map((image) => (
          <div key={image}>
            <img
              src={image}
              alt={image}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} // Đặt chiều rộng và chiều cao của hình ảnh
            />
          </div>
        ))}
      </WrapperSliderStyle>
    </div>
  );
};

export default SimpleSlider;
