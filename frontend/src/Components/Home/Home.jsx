import React, { useEffect, useState } from "react";
import SimpleSlider from "../Slider/SliderComponent";
import Category from "../Category/category";
import "./home.css";
import Brand from "../Brand/Brand";
import { Getallcategory, getAllSidebar } from "../../service/API";
import Voucher from "../Voucher/Voucher";

function Home({ setIsLoading }) {
  const [cat, setCat] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await Getallcategory();
        const res1 = await getAllSidebar();
        console.log(res.data);
        setCat(res.data.data);
        setImages(res1.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <SimpleSlider arrImages={images} setIsLoading={setIsLoading} />
      <Brand />
      <Voucher setIsLoading={setIsLoading} />
      {cat.map((category, index) => (
        <Category key={index} Category={category} />
      ))}
    </div>
  );
}

export default Home;
