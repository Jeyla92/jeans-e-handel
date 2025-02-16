import React from "react";
import { useLocation, Link } from "react-router-dom";
import { products } from "../Gallery/Gallery";
import "./SearchPage.css";

export const SearchPage = () => {
  // Hämta söktermen från URL:en
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("q") || "";

  // Filtrera produkter baserat på söktermen
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="search-page">
      <h2>Hittade {filteredProducts.length} produkter</h2>
      <div className="product-grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
            <Link to={`/products/${product.id}`}>
                 <img src={product.image} alt={product.name} className="product-image" />
                <h3>{product.name}</h3>
                <p>{product.price} SEK</p>
                <p>{product.brand}</p>
            </Link>

            </div>
          ))
        ) : (
          <p>Inga produkter matchar din sökning.</p>
        )}
      </div>
    </div>
  );
};
