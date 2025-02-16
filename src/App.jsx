import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Gallery } from "./components/Gallery/Gallery.jsx";
import { Header } from "./components/Header/Header.jsx";
import { ProductDetail } from "./components/ProductDetail/ProductDetail.jsx";
import { SearchPage } from "./components/Searchpage/SearchPage.jsx";

import Hero from "./components/Hero/Hero.jsx";

export const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div>
      <Header cart={cart} />
      <Hero />
      <Routes>
        <Route path="/" element={<Gallery />} />
        <Route path="/products/:id" element={<ProductDetail addToCart={addToCart} />} />
        <Route path="/search" element={<SearchPage />} /> 
      </Routes>
    </div>
  );
};
