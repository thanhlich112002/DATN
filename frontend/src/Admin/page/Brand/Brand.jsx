import React, { useState } from "react";
import BrandTable from "./BrandTable";

const Brand = ({ setIsLoading }) => {
  return (
    <div>
      <BrandTable setIsLoading={setIsLoading} />
    </div>
  );
};

export default Brand;
