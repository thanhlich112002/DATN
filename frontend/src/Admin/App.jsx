import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar/Sidebar";
import Dashboard from "./page/Dashboard/Dashboard";
import TableProduct from "./page/Product/TableProduct";
import Order from "./page/Order/Order";
import DetailOrder from "./page/Order/OrderDetail";
import TableCategory from "./page/Category/Category";
import AddCategory from "./page/Category/AddCategory";
import EditCategory from "./page/Category/Up";
import TableBrand from "./page/Brand/Brand";
import AddBrand from "./page/Brand/addAddBrand";
import EditBrand from "./page/Brand/UpBrand";
import AddProduct from "./page/Product/addProduct";
import UpProduct from "./page/Product/Upproduct";
import Voucher from "./page/Voucher/Voucher";
import Slidebar from "./page/Slidebar/Voucher";
import User from "./page/User/User";
import Headers from "./component/Headers/headers";
import LoadingModal from "../Components/Loading/Loading";
import { useState } from "react";
import Account from "./page/Account/Account";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div>
      <Sidebar>
        <Headers />
        {isLoading ? <LoadingModal /> : <></>}
        <Routes>
          <Route path="/" element={<Dashboard setIsLoading={setIsLoading} />} />
          <Route
            path="/category/add"
            element={<AddCategory setIsLoading={setIsLoading} />}
          />
          <Route
            path="/category/:id"
            element={<EditCategory setIsLoading={setIsLoading} />}
          />
          <Route
            path="/category"
            element={<TableCategory setIsLoading={setIsLoading} />}
          />
          <Route
            path="/brand/add"
            element={<AddBrand setIsLoading={setIsLoading} />}
          />
          <Route
            path="/brand/:id"
            element={<EditBrand setIsLoading={setIsLoading} />}
          />
          <Route
            path="/brand"
            element={<TableBrand setIsLoading={setIsLoading} />}
          />
          <Route
            path="/product"
            element={<TableProduct setIsLoading={setIsLoading} />}
          />
          <Route
            path="/product/add"
            element={<AddProduct setIsLoading={setIsLoading} />}
          />
          <Route
            path="/product/:id"
            element={<UpProduct setIsLoading={setIsLoading} />}
          />
          <Route
            path="/order"
            element={<Order setIsLoading={setIsLoading} />}
          />
          <Route
            path="/order/:id"
            element={<DetailOrder setIsLoading={setIsLoading} />}
          />
          <Route path="/user" element={<User setIsLoading={setIsLoading} />} />
          <Route
            path="/slidebar"
            element={<Slidebar setIsLoading={setIsLoading} />}
          />
          <Route
            path="/voucher"
            element={<Voucher setIsLoading={setIsLoading} />}
          />
          <Route
            path="/account/:id"
            element={<Account setIsLoading={setIsLoading} />}
          />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
