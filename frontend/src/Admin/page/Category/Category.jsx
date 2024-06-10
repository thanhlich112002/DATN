import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryTable from "./CategoryTable";

const App = () => {
  const [categories, setCategories] = useState();

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
