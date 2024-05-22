import React from "react";
import "./style.css";
import Item from "./item";

function Category() {
  return (
    <div className="container">
      <div className="cat">
        <div className="cat_title background_cl">Nước Hoa Nam</div>
        <div className="cat_img">
          <div class="overlay"></div>
          <img
            src="https://www.elleman.vn/wp-content/uploads/2021/10/24/204854/top-huong-nuoc-hoa-nam-bad-boy-elle-man-cover-1.jpeg"
            alt=""
          />
        </div>
      </div>
      <div className="cat">
        <div className="cat_list_product">
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
      </div>
      <div className="cat">
        <div className="cat_title background_cl cursor">xem thêm</div>
      </div>
    </div>
  );
}

export default Category;
