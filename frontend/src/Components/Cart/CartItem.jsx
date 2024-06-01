import React from "react";
import { useUser } from "../../service/userContext";

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
        <img src={product.images} alt={product.name} />
      </div>
      <div className="CartItem_np">
        <div className="">{product.name}</div>
        <div className="">{formatCurrency(product.price)}</div>
      </div>
      <div className="CartItem_end">
        <div className="CartItembt" onClick={() => removeFromCart(product)}>
          -
        </div>
        <div className="divider"></div>
        <div className="CartItem_">{product.quantity}</div>
        <div className="divider"></div>
        <div className="CartItembt" onClick={() => addToCart(product)}>
          +
        </div>
      </div>
    </div>
  );
}

export default CartItem;
