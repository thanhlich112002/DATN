import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightFromBracket,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Select({ title, actions, icon }) {
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
      onClick={() => actions()}
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
            backgroundColor: "#d3d3d3",
            fontSize: "20px",
          }}
        >
          <FontAwesomeIcon icon={icon} />
        </div>
        <div style={{ fontSize: ".9375rem", fontWeight: 500 }}>{title}</div>
      </div>
      <div>
        <FontAwesomeIcon icon={faChevronRight} />
      </div>
    </div>
  );
}

export default Select;
