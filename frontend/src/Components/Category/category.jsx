import React, { useEffect, useState } from "react";
import "./style.css";
import Item from "./item";
import { getAllProductsbyCat } from "../../service/API";

function Category({ Category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getAllProductsbyCat(Category.name, "5", "1");
        setProducts(productsData.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to fetch products. Please try again later.");
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container" style={{ border: "0.1px solid #cdcdcd" }}>
      <div className="cat">
        <div className="cat_title background_cl">{Category.name}</div>
        <div className="cat_img">
          <div className="overlay"></div>
          <img src={Category.images} alt={Category.name} />
        </div>
      </div>
      <div className="cat1">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="cat_list_product">
            {products.map((product, index) => (
              <Item key={index} product={product} />
            ))}
          </div>
        )}
      </div>
      <div className="cat2">
        <div className="cursor background_cl">Xem thêm</div>
      </div>
    </div>
  );
}

export default Category;
