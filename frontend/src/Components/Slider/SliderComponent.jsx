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
  & .slick-arrow.slick-prev {
    left: 12px;
    top: 50%;
    z-index: 10;
  }
  & .slick-arrow.slick-next {
    right: 28px;
    top: 50%;
    z-index: 10;
  }

  @media only screen and (min-width: 1000px) {
    & .slick-slide > div {
      height: 450px;
    }
  }

  @media only screen and (max-width: 800px) {
    & .slick-slide > div {
      height: 320px;
    }
  }

  @media only screen and (max-width: 600px) {
    & .slick-slide > div {
      height: 220px;
    }
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
    centerPadding: "150px",
    centerMode: true,
    centerPadding: "0",
  };

  return (
    <div className="slider-container">
      <WrapperSliderStyle {...settings}>
        {arrImages?.map((image) => (
          <div key={image._id}>
            <img src={image.img} alt={image.img} />
          </div>
        ))}
      </WrapperSliderStyle>
    </div>
  );
};

export default SimpleSlider;
