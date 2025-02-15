<<<<<<< HEAD
import { Header } from "./components/Header/Header";
function App() {
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
=======
import React from "react";
import { Routes, Route } from 'react-router-dom';
import { Gallery } from './components/Gallery/Gallery.jsx';
import { Header } from './components/Header/Header.jsx';
import { ProductDetail } from "./components/ProductDetail/ProductDetail.jsx";
import Hero from "./components/Hero/Hero.jsx"; 


export const App = () => {
  return (
    <div>
      <Header />
      <Hero />  
      <Routes>
        <Route path="/" element={<Gallery />} />
        
        <Route path="/product/:id" element={<ProductDetail />} />
        
      </Routes>
    </div>
  );
};
>>>>>>> e8306bb (Pushar upp public med bilder Gallery mapp, Hero, ProductDetails)
