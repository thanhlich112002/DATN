import React from "react";

function Input(props) {
  return (
    <div>
      <div className="input_title">
        {props?.title} <span className="required">*</span>
      </div>
      <input
        className="input_value"
        type={props?.type}
        placeholder={`Nhập ${props?.placeholder}`}
      />
    </div>
  );
}

export default Input;
