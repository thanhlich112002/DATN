import React, { useEffect, useState } from "react";
import { getAllVouchers, addVouchers } from "../../service/API";
import Vou from "./App";
import { toast } from "react-toastify";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";

const WrapperSliderStyle = styled(Slider)`
  & .slick-slide > div {
    padding: 0;
    margin: 0;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & .slick-arrow.slick-prev {
    left: 12px;
    top: 50%;
    z-index: 10;
  }
  & .slick-arrow.slick-next {
    right: 12px;
    top: 50%;
    z-index: 10;
  }
`;

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", left: "-25px" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faAngleLeft} />
    </div>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", right: "-25px" }}
      onClick={onClick}
    >
      <FontAwesomeIcon icon={faAngleRight} />
    </div>
  );
};

function Voucher() {
  const [vouchers, setVouchers] = useState([]);

  const fetchAllVouchers = async () => {
    try {
      const response = await getAllVouchers();
      setVouchers(response.data.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách phiếu giảm giá:", error);
    }
  };

  useEffect(() => {
    fetchAllVouchers();
  }, []);

  const handleAddVouchers = async (id) => {
    try {
      await addVouchers(id);
      toast.success("Đã thêm phiếu giảm giá");
      fetchAllVouchers();
    } catch (error) {
      console.error("Lỗi khi thêm phiếu giảm giá:", error);
      toast.error(error.response?.data?.message || "Lỗi không xác định");
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className="container_cus" style={{ border: "0.1px solid #cdcdcd" }}>
      {vouchers && vouchers.length > 0 ? (
        <>
          <div className="cat">
            <div className="cat_title background_cl">Phiếu giảm giá</div>
          </div>
          <WrapperSliderStyle {...settings}>
            {vouchers.map((item, index) => (
              <div key={index}>
                <Vou item={item} handleAddVouchers={handleAddVouchers} />
              </div>
            ))}
          </WrapperSliderStyle>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Voucher;
