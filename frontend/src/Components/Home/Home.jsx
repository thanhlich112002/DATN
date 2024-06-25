import React, { useEffect, useState } from "react";
import SimpleSlider from "../Slider/SliderComponent";
import Category from "../Category/category";
import "./home.css";
import Brand from "../Brand/Brand";
import { Getallcategory, getAllSidebar } from "../../service/API";
import Voucher from "../Voucher/Voucher";

function Home() {
  const [cat, setCat] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Getallcategory();
        const res1 = await getAllSidebar();
        console.log(res.data);
        setCat(res.data.data);
        setImages(res1.data.data);
        console.log("DSDSD", res1.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);
  return (
    <div>
      <SimpleSlider arrImages={images} />
      <Brand />
      <Voucher />
      {cat.map((category, index) => (
        <Category key={index} Category={category} />
      ))}
      <div className="container_cus">
        <div className="cat_titleplus">Chính sách đổi trả</div>
        <div className="plus">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=5322"
              className="card-img-top"
              alt="Description"
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=5322"
              alt="Description"
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="https://theme.hstatic.net/1000340570/1000964732/14/slideshow_1.jpg?v=5322"
              className="card-img-top"
              alt="Description"
            />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <a href="#" className="btn btn-primary">
                Go somewhere
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
