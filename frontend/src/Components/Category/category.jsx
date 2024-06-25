import React, { useEffect, useState } from "react";
import "./style.css";
import Item from "./item";
import { getAllProductsbyCat } from "../../service/API";
import { useNavigate } from "react-router-dom";

function Category({ Category, del }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleNavClick = () => {
    navigate(`/collections?category=${encodeURIComponent(Category._id)}`);
  };
  const fetchProducts = async () => {
    try {
      const productsData = await getAllProductsbyCat(Category?._id, "5", "1");
      setProducts(productsData.data.data);
      setLoading(false);
    } catch (error) {
      setError("Không thể lấy sản phẩm. Vui lòng thử lại sau.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [Category]);

  return (
    <div className="container_cus">
      <div className="cat">
        <div className="cat_title background_cl">{Category?.name}</div>
        <div className="cat_img">
          <div className="overlay"></div>
          <img src={Category?.images} alt={Category?.name} />
        </div>
      </div>

      <div className="cat1">
        <div className="cat_list_product">
          {products.map((product, index) => (
            <Item key={index} product={product} />
          ))}
        </div>
      </div>
      <div className="cat2" s>
        <div className="cursor background_cl" onClick={handleNavClick}>
          Xem thêm
        </div>
      </div>
    </div>
  );
}

export default Category;
