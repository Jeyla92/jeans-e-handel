import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";
import Hero from "../Hero/Hero";

export const Gallery = () => {
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Här hämtar vi produkterna från databasen eller API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkter:", error);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  // Här sorterar jag produkterna efter publiceringsdatum (senaste först)
  const sortedProducts = [...products].sort(
    (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
  );

  return (
    <>
      <Hero />
      <div className="gallery">
        {sortedProducts.map((product, index) => (
          <div key={`${product.id}-${index}`} className="card">
            <div className="image-container">
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="card-image"
                />
              </Link>

              {index === 0 && <span className="badge">Nyhet</span>}
              <button
                className={`heart-button ${
                  favorites.includes(product.id) ? "favorited" : ""
                }`}
                onClick={() => toggleFavorite(product.id)}
              >
                ❤️
              </button>
            </div>
            <h3 className="card-title">{product.name}</h3>
            <p className="card-brand">{product.brand}</p>
            <p className="card-price">{product.price}</p>
          </div>
        ))}
      </div>
    </>
  );
};
