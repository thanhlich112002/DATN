import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryTable from "./CategoryTable";

const App = () => {
  const [categories, setCategories] = useState([
    {
      _id: 1,
      ID: 1,
      name: "Danh mục 1",
      description: "Mô tả danh mục 1",
      images: ["https://via.placeholder.com/70"],
    },
    {
      _id: 2,
      ID: 2,
      name: "Danh mục 2",
      description: "Mô tả danh mục 2",
      images: ["https://via.placeholder.com/70"],
    },
    {
      _id: 3,
      ID: 3,
      name: "Danh mục 3",
      description:
        "Mô tả danh mục 3 rất dài, vượt quá 100 ký tự. Đây là một mô tả ví dụ để kiểm tra xem việc giới hạn mô tả trong bảng có hoạt động tốt hay không.",
      images: ["https://via.placeholder.com/70"],
    },
  ]);

  const handleDelete = async (id) => {
    setCategories(categories.filter((category) => category._id !== id));
  };

  return (
    <div>
      <CategoryTable categories={categories} onDelete={handleDelete} />
    </div>
  );
};

export default App;
