import React from "react";
import SimpleSlider from "../Slider/SliderComponent";
import Category from "../Category/category";
import "./home.css";
import pizzaBanner1 from "../assets/imgs/pizza-banner-1.png";
import pizzaBanner2 from "../assets/imgs/pizza-banner-2.png";
import pizzaBanner3 from "../assets/imgs/pizza-banner-3.png";
import pizzaBanner4 from "../assets/imgs/pizza-banner-4.jpg";

function Home() {
  const images = [pizzaBanner1, pizzaBanner2, pizzaBanner3, pizzaBanner4];
  return (
    <div>
      <div>
        <SimpleSlider arrImages={images} />
        <Category />
      </div>
    </div>
  );
}

export default Home;
