import React, { useEffect, useState } from "react";
import { getFavorite } from "../../service/API.jsx";
import Item from "../../Components/Category/item"; // Assuming Item is another component to display a single product

function Favorite() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch favorite products when the component mounts
    const fetchFavorites = async () => {
      try {
        const favoriteProducts = await getFavorite();
        console.log(favoriteProducts.data.data);
        setProducts(favoriteProducts.data.data);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="container">
      <div>
        <h1>Danh sách yêu thích</h1>
      </div>
      <div>
        <div className="cat_list_product">
          {products?.map((product, index) => (
            <Item key={index} product={product.product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorite;
