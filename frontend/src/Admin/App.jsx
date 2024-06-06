import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar/Sidebar";
import Dashboard from "./page/Dashboard/Dashboard";
import TableProduct from "./page/Product/TableProduct";
import TableCategory from "./page/Category/Category";
import AddCategory from "./page/Category/addCatrgory";

const App = () => {
  return (
    <div>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/tableCategory/add" element={<AddCategory />} />
          <Route path="/tableProduct" element={<TableProduct />} />
          <Route path="/tableCategory" element={<TableCategory />} />
        </Routes>
      </Sidebar>
    </div>
  );
};

export default App;
