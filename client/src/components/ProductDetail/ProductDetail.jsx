import React from "react";
import { useParams, Link } from "react-router-dom";
import { products } from "../Gallery/Gallery";
import "./ProductDetail.css";

export const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <h2 className="error-message">Produkten hittades inte</h2>;
  }

  const similarProducts = products.filter((p) => p.id !== id).slice(0, 5);

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="brand">{product.brand}</p>
          <p className="price">{product.price} SEK</p>
          <p className="description">{product.description}</p>
          <button className="add-to-cart" onClick={() => addToCart(product)}>
            Lägg i varukorg
          </button>
        </div>
      </div>

      <h2 className="similar-products-title">Liknande produkter</h2>
      <div className="similar-products">
        {similarProducts.map((similar) => (
          <Link
            key={similar.id}
            to={`/products/${similar.id}`}
            className="similar-product-card"
          >
            <img
              src={similar.image}
              alt={similar.name}
              className="similar-product-image"
            />
            <p>{similar.name}</p>
            <p>{similar.price} SEK</p>
            <p className="brand">{similar.brand}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
