import React, { useEffect, useState } from "react";
import { searchProducts } from "../../service/API.jsx";
import Item from "../Category/item.jsx";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Favorite() {
  const [products, setProducts] = useState([]);
  const query = useQuery().get("query");
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoriteProducts = await searchProducts({
          search: query,
        });
        console.log(favoriteProducts.data.data);
        setProducts(favoriteProducts.data.data);
      } catch (error) {
        console.error("Error fetching favorite products:", error);
      }
    };
    fetchFavorites();
  }, [query]);

  return (
    <div className="container_cus">
      <div style={{ marginTop: "20px" }}>
        <h2>Danh sách yêu thích</h2>
      </div>
      <div style={{ minHeight: "300px" }}>
        {products.length ? (
          <div className="cat_list_product">
            {products?.map((product, index) => (
              <Item key={index} product={product} />
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
