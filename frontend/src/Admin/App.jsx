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

const App = () => {
  return (
    <div>
      <Sidebar>
        <Headers />
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
          <Route path="/order/:id" element={<DetailOrder />} />
          <Route path="/user" element={<User />} />
          <Route path="/slidebar" element={<Slidebar />} />
          <Route path="/voucher" element={<Voucher />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
