import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Gallery.css";

export const products = [
  {
    id: "jeans1",
    name: "Skinny Fit Jeans",
    price: "699 SEK",
    brand: "Levis",
    image: "/woman1.jpg",
    publishedDate: "2024-02-17",
  },
  {
    id: "jeans2",
    name: "Super Skinny Jeans",
    price: "749 SEK",
    brand: "Guess",
    image: "/woman7.jpg",
    publishedDate: "2024-02-10",
  },
  {
    id: "jeans3",
    name: "Low Waist Bootcut Jeans",
    price: "799 SEK",
    brand: "Wrangler",
    image: "/woman2.jpg",
    publishedDate: "2024-02-12",
  },
  {
    id: "jeans4",
    name: "Stretch Bootcut Jeans",
    price: "849 SEK",
    brand: "Diesel",
    image: "/woman3.jpg",
    publishedDate: "2024-02-19",
  },
  {
    id: "jeans5",
    name: "Relaxed Baggy Jeans",
    price: "899 SEK",
    brand: "Carhartt",
    image: "/woman5.jpg",
    publishedDate: "2024-02-20",
  },
  {
    id: "jeans6",
    name: "High Waist Mom Jeans",
    price: "799 SEK",
    brand: "Levis",
    image: "/woman4.jpg",
    publishedDate: "2024-02-17",
  },
  {
    id: "jeans7",
    name: "High Waist Straight Jeans",
    price: "849 SEK",
    brand: "Tommy Hilfiger",
    image: "/woman6.jpg",
    publishedDate: "2024-02-18",
  },
  {
    id: "jeans8",
    name: "High Waist Flare Jeans",
    price: "899 SEK",
    brand: "Lee",
    image: "/woman8.jpg",
    publishedDate: "2024-02-20",
  },
];

export const Gallery = () => {
  const [favorites, setFavorites] = useState([]);

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
    <div className="gallery">
      {sortedProducts.map((product, index) => (
        <div key={product.id} className="card">
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
  );
};
