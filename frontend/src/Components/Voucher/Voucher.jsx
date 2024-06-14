import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { getAllVouchers, addVouchers } from "../../service/API";
import Vou from "./App";
import { toast } from "react-toastify";

function Voucher() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [vouchers, setVouchers] = useState([]);
  const fetchAllVouchers = async () => {
    try {
      const response = await getAllVouchers();
      setVouchers(response.data.data);
      console.log(response.data);
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
      toast.error(error.response.data.message);
    }
  };

  const moveIcon = (direction) => {
    if (direction === "left" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (direction === "right" && currentIndex < vouchers.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="container_cus">
      <div className="listVoucher">
        <div className="cirl1" onClick={() => moveIcon("left")}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>

        {vouchers &&
          vouchers
            .slice(currentIndex, currentIndex + 3)
            .map((item, index) => (
              <Vou
                key={index}
                item={item}
                handleAddVouchers={handleAddVouchers}
              />
            ))}

        <div className="cirl2" onClick={() => moveIcon("right")}>
          <FontAwesomeIcon icon={faAngleRight} />
        </div>
      </div>
    </div>
  );
}

export default Voucher;
