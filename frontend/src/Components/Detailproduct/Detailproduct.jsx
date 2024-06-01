import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../service/userContext"; // Import the custom hook
import style from "./Detailproduct.css";

function Detailproduct({ setDetail, item }) {
  const { addToCart } = useUser();
  console.log(item);

  function formatCurrency(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }

  const [note, setNote] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e) => {
    setNote(e.target.value);
    console.log(e.target.value);
  };

  const add = () => {
    console.log(note);
    addToCart({ ...item, noti: note });
    setDetail(false);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const descriptionLines = item.description.split("\n");
  const previewLines = descriptionLines.slice(0, 3).join("\n");

  return (
    <div>
      <div className="model">
        <div className="Detailproduct">
          <div className="Detailproduct_left">
            <div className="df_Img">
              <img src={item.images} alt="" />
            </div>
            <div className="d_price">{formatCurrency(item.price)}</div>
          </div>
          <div className="Detailproduct_right">
            <div className="dr_Name_item">
              <span>{item.name}</span>
            </div>
            <div className="dr_describe_item">
              <div>{isExpanded ? item.description : previewLines}</div>
              {descriptionLines.length > 3 && (
                <button onClick={toggleExpand}>
                  {isExpanded ? "Show Less" : "Show More"}
                </button>
              )}
            </div>
            <div className="dr_Name_item color">
              <span>Ghi chú</span>
            </div>
            <div className="dr_note">
              <textarea
                cols="30"
                rows="10"
                placeholder="Nhập ghi chú của bạn tại đây"
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="dr_button" onClick={add}>
              <span>Thêm vào giỏ hàng</span>
            </div>
          </div>
          <div className="button_close" onClick={() => setDetail(false)}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Detailproduct;
