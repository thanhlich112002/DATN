import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import style from "./Collections.css";
import Item from "../Category/item";
import {
  getAllProducts,
  getAllBrands,
  seachBrands,
  Getallcategory,
  searchProducts,
} from "../../service/API";
import { useLocation } from "react-router-dom";

function Collections({ setIsLoading }) {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [cat, setCat] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const searchInputRef = useRef();
  const query = useQuery().get("query");
  const category = useQuery().get("category");
  const brand = useQuery().get("brand");
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  useEffect(() => {
    SearchProducts();
  }, [selectedBrands, selectedCategories, query]);
  useEffect(() => {
    if (category) {
      handleCategoryChange(category);
    }
    if (brand) {
      handleBrandChange(brand);
    }
  }, []);

  const SeachBands = async (_id) => {
    try {
      const brandsResponse = await seachBrands(_id);
      console.log(_id);
      setBrands(brandsResponse.data.data);
    } catch (error) {
      console.error("Failed to search brands:", error);
    }
  };

  const SearchProducts = async () => {
    try {
      setIsLoading(true);
      const productsResponse = await searchProducts({
        search: query,
        CategoryID: selectedCategories,
        BrandID: selectedBrands,
      });
      setProducts(productsResponse.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to search products:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const brandsResponse = await getAllBrands();
        setBrands(brandsResponse.data.data);
        const productsResponse = await getAllProducts();
        setProducts(productsResponse.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setIsLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const res = await Getallcategory();
        console.log(res.data);
        setCat(res.data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleSearch = () => {
    if (searchInputRef.current) {
      SeachBands(searchInputRef.current.value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleBrandChange = (brandName) => {
    const updatedSelectedBrands = selectedBrands.includes(brandName)
      ? selectedBrands.filter((_id) => _id !== brandName)
      : [...selectedBrands, brandName];

    setSelectedBrands(updatedSelectedBrands);
  };

  const handleCategoryChange = (categoryName) => {
    const updatedSelectedCategories = selectedCategories.includes(categoryName)
      ? selectedCategories.filter((_id) => _id !== categoryName)
      : [...selectedCategories, categoryName];

    setSelectedCategories(updatedSelectedCategories);
  };

  return (
    <div className="container_cus">
      <div className="collections">
        <div className="collections_left">
          <div className="collections_left_">
            <div className="collections_title">BỘ LỌC</div>
            <div className="collections_col">Giúp bạn tìm kiếm nhanh hơn</div>
          </div>
          <div className="collections_left_">
            <div className="collections_title">Thương hiệu</div>
            <div className="collections_input">
              <input
                type="text"
                placeholder="Tìm thương hiệu"
                ref={searchInputRef}
                onKeyPress={handleKeyPress}
              />
              <div className="backgroundcolor">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  onClick={handleSearch}
                />
              </div>
            </div>
            <div className="collections_left_checkbox">
              {brands.length ? (
                brands.map((brand, index) => (
                  <label key={index} className="checkbox-container">
                    <div className="collections_col">{brand.name}</div>
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand._id)}
                      onChange={() => handleBrandChange(brand._id)}
                    />
                    <span className="checkmark"></span>
                  </label>
                ))
              ) : (
                <>Không có chi nhánh nào</>
              )}
            </div>
          </div>
          <div className="collections_left_">
            <div className="collections_title">Danh mục</div>
            <div className="collections_left_checkbox">
              {cat.map((category, index) => (
                <label key={index} className="checkbox-container">
                  <div className="collections_col">{category.name}</div>
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category._id)}
                    onChange={() => handleCategoryChange(category._id)}
                  />
                  <span className="checkmark"></span>
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="collections_right">
          <div className="collections_right_">
            <div className="collections_right_title">Tất cả sản phẩm</div>
          </div>
          <div className="collections_right_">
            <div className="collections_right_col">
              {products.map((product, index) => (
                <Item key={index} product={product} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Collections;
