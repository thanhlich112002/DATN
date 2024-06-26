import React from "react";
import { useUser } from "../../../service/userContext";

function CartItem({ product }) {
  const { addToCart, removeFromCart } = useUser();
  function formatCurrency(price) {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  }
  return (
    <div className="CartItem">
      <div className="CartItem_img">
        <img src={product.product.images} alt={product.product.name} />
      </div>
      <div className="CartItem_np">
        <div className="">{product.product.name}</div>
        <div className="">{formatCurrency(product.product.price)}</div>
      </div>
      <div className="CartItem_end">
        <span>Số lượng</span>
        <div className="CartItem_">{product.quantity}</div>
      </div>
    </div>
  );
}

export default CartItem;
