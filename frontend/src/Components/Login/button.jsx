import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Input() {
  return (
    <div>
      <div className="button">
        <div>Đăng nhập</div>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}

export default Input;
