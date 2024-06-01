import React from "react";

function Input(props) {
  return (
    <div>
      <div className="input_title">
        {props?.title} <span className="required">*</span>
      </div>
      <input
        id={props?.type}
        className="input_value"
        type={props?.type}
        placeholder={`Nhập ${props?.placeholder}`}
        onChange={(e) => props.setValue(e.target.value)}
      />
    </div>
  );
}

export default Input;
