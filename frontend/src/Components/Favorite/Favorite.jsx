import React, { useEffect, useState } from "react";
import { getFavorite } from "../../service/API.jsx";
import Item from "../../Components/Category/item";

function Favorite() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
    <div className="container_cus">
      <div style={{ marginTop: "20px" }}>
        <h2>Danh sách yêu thích</h2>
      </div>
      <div style={{ minHeight: "300px" }}>
        {products.length ? (
          <div className="cat_list_product">
            {products?.map((product, index) => (
              <Item key={index} product={product.product} />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "50px",
            }}
          >
            <span style={{ fontSize: "20px" }}>
              Bạn chưa yêu thích sản phẩm nào{" "}
            </span>
            <a
              style={{ fontSize: "16px", cursor: "pointer" }}
              href="/collections"
            >
              Quay lại mua hàng
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorite;
