import React, { useState } from "react";
import "./toptable.css";

function TopTable({ setStatus }) {
  return (
    <div className="orderbar">
      <div className="orderbar-status">
        <div className="box-status ">opening</div>
        <div className="box-status">Comfermed</div>
        <div className="box-status">pading</div>
        <div className="box-status">pading</div>
        <div className="box-status">pading</div>
      </div>
      <div className="orderbar-status">
        <label>Từ</label>
        <input type="date" />
        <label>Đến</label>
        <input type="date" />
      </div>
    </div>
  );
}
export default TopTable;
