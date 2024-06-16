import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import socketIOClient from "socket.io-client";
import style from "./style.css";
function Notification() {
  return (
    <div
      style={{
        display: "flex",
        position: "absolute",
        width: "300px",
        height: "400px",
        background: "#ffffff",
        flexDirection: "column",
        borderRadius: "5px",
        overflow: "hidden",
        overflowY: "auto",
        top: "60px",
        right: "80px",
        zIndex: 100000,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
      }}
    >
      <div>
        <h3 style={{ margin: "0px 10px" }}>Thông báo</h3>
        <div style={{ margin: "10px 10px 0px", display: "flex", gap: "10px" }}>
          <div className="addbutxx">Tất cả</div>
          <div className="addbutxx">Chưa xem</div>
        </div>
      </div>
      <div className="notification">
        <div className="notification-content">
          <span className="notification-title">Đơn hàng mới</span>
          <p className="notification-id">ID: 123456789uyhged</p>
          <o className="notification-time">10:30 16/6/2024</o>
        </div>
        <div className="notification-dot"></div>
      </div>
    </div>
  );
}

function Headers() {
  //   const host = "http://localhost:3000";
  //   useEffect(() => {
  //     const socket = socketIOClient(host);
  //     socket.on("middlewareMessage", (notification) => {
  //       alert(notification);
  //     });
  //     return () => {
  //       socket.disconnect();
  //     };
  //   }, []);
  return (
    <div>
      {" "}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          borderBottom: " 0.1px solid #ebebeb",
          alignContent: "center",
        }}
      >
        <div
          style={{
            margin: "10px 0px",
            height: "40px",
            width: "40px",
            borderRadius: "50px",
            backgroundColor: "#dedede",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          class="position-relative"
        >
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "20px" }} />
          <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            0
          </span>
        </div>
        {/* <Notification /> */}
        <div
          style={{
            margin: "10px 20px",
            height: "40px",
            width: "40px",
            borderRadius: "50px",
            overflow: "hidden",
          }}
        >
          <img
            style={{ width: "40px", height: "40px" }}
            src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/341567992_189194443477447_7522191387098263235_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEarTZE1aOvAEMKCFgm0iyGwIk906XKCkTAiT3TpcoKRF6DzDf_rTfilFbZ4fh7aLieJ-YbdEzNf9h1RH7jnDvV&_nc_ohc=9wgj3DPaut0Q7kNvgHTlYj1&_nc_ht=scontent.fdad1-4.fna&oh=00_AYCWXjvjWodp66otNOxgqb4FY1ZCXIeiQMDsaykFLSwuZg&oe=666FD5B9"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Headers;
