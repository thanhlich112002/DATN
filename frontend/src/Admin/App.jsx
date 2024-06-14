import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar/Sidebar";
import Dashboard from "./page/Dashboard/Dashboard";
import TableProduct from "./page/Product/TableProduct";
import Order from "./page/Order/Order";
import TableCategory from "./page/Category/Category";
import AddCategory from "./page/Category/AddCategory";
import EditCategory from "./page/Category/Up";
import TableBrand from "./page/Brand/Brand";
import AddBrand from "./page/Brand/addAddBrand";
import EditBrand from "./page/Brand/UpBrand";
import AddProduct from "./page/Product/addProduct";
import UpProduct from "./page/Product/Upproduct";
import Voucher from "./page/Voucher/Voucher";
import User from "./page/User/User";
import socketIOClient from "socket.io-client";
import { useEffect, useState } from "react";
const host = "http://localhost:3000";
const App = () => {
  const [notification, setNotification] = useState("");
  useEffect(() => {
    const socket = socketIOClient.connect(host);
    socket.on("serverNotification", (notification) => {
      setNotification(notification);
    });
    return () => {
      socket.disconnect();
    };
  }, []);
  return (
    <div>
      <Sidebar>
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
              margin: "10px 20px",
              height: "40px",
              width: "40px",
              borderRadius: "50px",
              overflow: "hidden",
            }}
          >
            {notification}
            <img
              style={{ width: "40px", height: "40px" }}
              src="https://scontent.fdad1-4.fna.fbcdn.net/v/t39.30808-1/341567992_189194443477447_7522191387098263235_n.jpg?stp=cp6_dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEarTZE1aOvAEMKCFgm0iyGwIk906XKCkTAiT3TpcoKRF6DzDf_rTfilFbZ4fh7aLieJ-YbdEzNf9h1RH7jnDvV&_nc_ohc=9wgj3DPaut0Q7kNvgHTlYj1&_nc_ht=scontent.fdad1-4.fna&oh=00_AYCWXjvjWodp66otNOxgqb4FY1ZCXIeiQMDsaykFLSwuZg&oe=666FD5B9"
              alt=""
            />
          </div>
        </div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/category/add" element={<AddCategory />} />
          <Route path="/category/:id" element={<EditCategory />} />
          <Route path="/category" element={<TableCategory />} />
          <Route path="/brand/add" element={<AddBrand />} />
          <Route path="/brand/:id" element={<EditBrand />} />
          <Route path="/brand" element={<TableBrand />} />
          <Route path="/product" element={<TableProduct />} />
          <Route path="/product/add" element={<AddProduct />} />
          <Route path="/product/:id" element={<UpProduct />} />
          <Route path="/order" element={<Order />} />
          <Route path="/user" element={<User />} />
          <Route path="/voucher" element={<Voucher />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
