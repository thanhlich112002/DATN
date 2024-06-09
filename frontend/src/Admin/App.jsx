import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar/Sidebar";
import Dashboard from "./page/Dashboard/Dashboard";
import TableProduct from "./page/Product/TableProduct";
import Order from "./page/Order/TableProduct";
import TableCategory from "./page/Category/Category";
import AddCategory from "./page/Category/addCatrgory";
import AddProduct from "./page/Product/addProduct";
import UpProduct from "./page/Product/add";
import Voucher from "./page/Voucher/Voucher";

const App = () => {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tablecategory/add" element={<AddCategory />} />
          <Route path="/tableCategory" element={<TableCategory />} />
          <Route path="/tableproduct" element={<TableProduct />} />
          <Route path="/tableproduct/add" element={<AddProduct />} />
          <Route path="/tableproduct/:id" element={<UpProduct />} />
          <Route path="/manageuser" element={<UpProduct />} />
          <Route path="/manageorder" element={<Order />} />
          <Route path="/managevoucher" element={<Voucher />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
