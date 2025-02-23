import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header.jsx";
import { Gallery } from "./components/Gallery/Gallery.jsx";
import { Footer } from "./components/Footer/Footer.jsx";
import { ProductDetail } from "./components/ProductDetail/ProductDetail.jsx";
import { SearchPage } from "./components/Searchpage/SearchPage.jsx";
import { ShoppingCart } from "./components/ShoppingCart/ShoppingCart.jsx";
import { Checkout } from "./components/Checkout/Checkout.jsx";

export const App = () => {
  const [cart, setCart] = useState([]);

  // Lägg till detta:
  const fetchCart = async () => {
    try {
      const response = await fetch("/api/cart");
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error("Fel vid hämtning av varukorgen:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (product, quantity) => {
    try {
      const response = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product.id,
          quantity: quantity,
        }),
      });

      const data = await response.json();
      if (data.success) {
        console.log("Product added to cart successfully");
        fetchCart();
      } else {
        console.error("Failed to add product to cart:", data.message);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  const increment = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decrement = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product_id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <div>
      <Header cart={cart} />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route
          path="/products/:id"
          element={<ProductDetail addToCart={addToCart} />}
        />
        <Route path="/search" element={<SearchPage />} />
        <Route
          path="/shoppingcart"
          element={
            <ShoppingCart
              cart={cart}
              fetchCart={fetchCart}
              increment={increment}
              decrement={decrement}
            />
          }
        />
        <Route path="/checkout" element={<Checkout cart={cart} />} />
      </Routes>
      <Footer />
    </div>
  );
};
