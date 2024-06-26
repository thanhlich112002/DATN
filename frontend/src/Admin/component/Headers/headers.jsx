import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { getAllNotifications, isSend } from "../../service/userService";
import socketIOClient from "socket.io-client";
import style from "./style.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../service/authContext";
function Notification({ listNoti, fetchAllNotifications, setIsOpen }) {
  const Send = async (id, _id) => {
    await isSend(id);
    handleDetail1(_id);
    fetchAllNotifications();
    setIsOpen(false);
  };
  const navigate = useNavigate();
  const handleDetail1 = (id) => {
    navigate(`/admin/order/${id}`);
    setIsOpen(false);
  };

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
          {/* <div className="addbutxx">Tất cả</div>
          <div className="addbutxx">Chưa xem</div> */}
        </div>
      </div>
      {listNoti &&
        listNoti.map((noti, key) => (
          <div
            className="notification"
            style={{ cursor: "pointer" }}
            key={key}
            onClick={() => Send(noti._id, noti.orderId)}
          >
            <div className="notification-content">
              <span className="notification-title">{noti.title}</span>
              <p className="notification-id">ID: {noti.orderId}</p>
              <o className="notification-time">
                {new Date(noti.createdAt).toLocaleString()}
              </o>
            </div>
            <div className={!noti.isSend ? "notification-dot" : ""}></div>
          </div>
        ))}
    </div>
  );
}

function Notification1({ notification, fetchAllNotifications }) {
  const Send = async (id, _id) => {
    await isSend(id);
    fetchAllNotifications();
    handleDetail1(_id);
  };
  const navigate = useNavigate();
  const handleDetail1 = (id) => {
    navigate(`/admin/order/${id}`);
  };

  return (
    <div
      className="container__notification"
      onClick={() => Send(notification._id, notification.orderId)}
    >
      <div className="notification">
        <div className="notification-content">
          <span className="notification-title">{notification.title}</span>
          <p className="notification-id">ID: {notification.orderId}</p>
          <o className="notification-time">{notification.createdAt}</o>
        </div>
        <div className="notification-dot"></div>
      </div>
    </div>
  );
}

function Headers() {
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState([]);
  const [isOpention, setIsOpention] = useState(false);
  const [listNoti, setListNoti] = useState([]);
  const host = "https://datn-ten-zeta.vercel.app";
  const { user } = useAuth();
  const fetchAllNotifications = async () => {
    try {
      const response = await getAllNotifications();
      setListNoti(response.data.notifications);
      console.log("", response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    fetchAllNotifications();
    const socket = socketIOClient(host);
    socket.on("middlewareMessage", (notification) => {
      setNotification(notification);
      fetchAllNotifications();
      setIsOpention(true);
      const timeout = setTimeout(() => {
        setIsOpention(false);
      }, 5000);
      return () => {
        clearTimeout(timeout);
      };
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const navigate = useNavigate();
  const handleDetail2 = () => {
    navigate(`/admin/account/info`);
  };

  return (
    <div>
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
            cursor: "pointer",
          }}
          className="position-relative"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={faBell} style={{ fontSize: "20px" }} />
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {listNoti.filter((noti) => !noti.isSend).length}
          </span>
        </div>
        {isOpen ? (
          <Notification
            listNoti={listNoti}
            fetchAllNotifications={fetchAllNotifications}
            setIsOpen={setIsOpen}
          />
        ) : (
          <></>
        )}
        {isOpention ? (
          <Notification1
            notification={notification}
            fetchAllNotifications={fetchAllNotifications}
          />
        ) : (
          <></>
        )}

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
            onClick={() => handleDetail2()}
            style={{ width: "40px", height: "40px", cursor: " pointer" }}
            src={user?.photo}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default Headers;
