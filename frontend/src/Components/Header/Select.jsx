import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Select() {
  return (
    <div
      className="hover"
      style={{
        display: "flex",
        fontSize: "20 px",
        margin: "5px 10px 5px 5px",
        padding: "5px 5px 5px 5px",
        height: "100%",
        justifyContent: "space-between",
        transition: "background-color 0.3s ease",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "35px",
            width: "35px",
            borderRadius: "50px",
            backgroundColor: "gray",
            fontSize: "20px",
          }}
        >
          <FontAwesomeIcon icon={faRightFromBracket} />
        </div>
        <div style={{ fontWeight: "500px", fontSize: "18px" }}>Đăng xuất</div>
      </div>
      <div>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}

export default Select;
