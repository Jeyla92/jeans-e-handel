import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ShoppingCart.css";

export const ShoppingCart = ({ cart, fetchCart }) => {
  const [quantities, setQuantities] = useState(
    cart.reduce((acc, item) => {
      acc[item.id] = item.quantity || 1;
      return acc;
    }, {})
  );

  const removeFromCart = (productId) => {
    fetch(`/api/cart/remove?productId=${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Product removed from cart");
          fetchCart();
        } else {
          console.error("Failed to remove product:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error removing from cart:", error);
      });
  };

  const updateQuantityInCart = (productId, newQuantity) => {
    fetch("/api/cart/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId: productId,
        quantity: newQuantity,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log("Product quantity updated in cart");
          fetchCart();
        } else {
          console.error("Failed to update product quantity:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error updating quantity in cart:", error);
      });
  };

  const increment = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]: prevQuantities[productId] + 1,
      };
      updateQuantityInCart(productId, newQuantities[productId]);
      return newQuantities;
    });
  };

  const decrement = (productId) => {
    setQuantities((prevQuantities) => {
      const newQuantities = {
        ...prevQuantities,
        [productId]:
          prevQuantities[productId] > 1 ? prevQuantities[productId] - 1 : 1,
      };
      updateQuantityInCart(productId, newQuantities[productId]);
      return newQuantities;
    });
  };

  const calculateSubTotal = () => {
    return cart
      .reduce((acc, item) => acc + parseFloat(item.total_price), 0)
      .toFixed(2);
  };

  return (
    <div className="shoppingcart-container">
      <h1 className="title">Din shoppingbag</h1>

      {cart.map((product) => (
        <div className="cart-item" key={product.id}>
          <div className="image">
            <img src={product.image} alt={product.name} />
          </div>
          <div className="product-info">
            <h2 className="product-name">{product.name}</h2>
            <span className="product-price">{product.price}</span>
          </div>
          <div className="quantity-controls">
            <button onClick={() => increment(product.id)}>+</button>
            <input type="text" readOnly value={quantities[product.id]} />
            <button onClick={() => decrement(product.id)}>-</button>
          </div>
          <button
            className="remove-from-cart-btn"
            onClick={() => removeFromCart(product.id)}
          >
            🗑️
          </button>
        </div>
      ))}

      <div className="total">
        Totalbelopp: <span>{calculateSubTotal()}</span> kr
        <Link to="/checkout" className="checkout-btn">
          Till kassan
        </Link>
      </div>
    </div>
  );
};
