import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Gallery } from "./components/Gallery/Gallery.jsx";
import { Header } from "./components/Header/Header.jsx";
import { ProductDetail } from "./components/ProductDetail/ProductDetail.jsx";
import Hero from "./components/Hero/Hero.jsx";

export const App = () => {
  const [cart, setCart] = useState([]);

  
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <Header cart={cart} /> {/* Här skickar vi cart till Header */}
      <Hero />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
      </Routes>
    </div>
  );
};
