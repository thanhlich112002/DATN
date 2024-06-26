import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CategoryTable from "./CategoryTable";

const App = ({ setIsLoading }) => {
  return (
    <div>
      <CategoryTable setIsLoading={setIsLoading} />
    </div>
  );
};

export default App;
