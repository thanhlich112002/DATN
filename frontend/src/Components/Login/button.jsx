import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

function Input({ title, handle }) {
  return (
    <div>
      <div className="button" onClick={handle}>
        <div>{title}</div>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}

export default Input;
