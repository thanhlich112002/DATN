import React, { useEffect, useState } from "react";
import SimpleSlider from "../Slider/SliderComponent";
import Category from "../Category/category";
import "./home.css";
import Brand from "../Brand/Brand";
import { Getallcategory } from "../../service/API";
import Voucher from "../Voucher/Voucher";

function Home() {
  const [cat, setCat] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Getallcategory();
        console.log(res.data);
        setCat(res.data.data); // Assuming res.data is an array of categories
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);
  const images = [
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=5322",
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=5322",
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=5322",
    "https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=5322",
  ];
  return (
    <div>
      <div>
        <SimpleSlider arrImages={images} />
        <Brand />
        <Voucher />
        {cat.map((category, index) => (
          <Category key={index} Category={category} />
        ))}
      </div>
    </div>
  );
}

export default Home;
