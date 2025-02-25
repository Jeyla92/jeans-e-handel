import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Products.css";

export const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/products");
      if (!response.ok) {
        throw new Error("Failed to load products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      alert("Error loading products: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (!confirmed) return;

    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the product from the local state
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productId)
        );
        alert("Product deleted successfully");
      } else {
        alert("Failed to delete product");
      }
    } catch (err) {
      alert("Error deleting product: " + err.message);
    }
  };

  return (
    <div className="admin-container">
      <div className="main-content">
        <div className="sidebar">
          <ul>
            <li>
              <a href="#">Produkt</a>
            </li>
            <li>
              <a href="#">Beställningar</a>
            </li>
            <li>
              <a href="#">Kundhantering</a>
            </li>
            <li>
              <a href="#">Innehållshantering</a>
            </li>
            <li>
              <a href="#">Support</a>
            </li>
          </ul>
        </div>

        <div className="content-area">
          <div className="header">
            <h1>Administration</h1>
          </div>

          <div className="content-section">
            <h2 className="section-title">Produkter</h2>
            <div className="button-group">
              <button className="btn" onClick={loadProducts} disabled={loading}>
                {loading ? "Laddar..." : "Ladda om produkter"}
              </button>
              <Link to="/admin/newproducts" className="btn">
                Ny produkt
              </Link>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Titel</th>
                <th>SKU</th>
                <th>Pris</th>
                <th></th>
              </tr>
            </thead>
            <tbody id="products-table-body">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <tr key={index}>
                    <td>{product.name}</td>
                    <td>{product.SKU}</td>
                    <td>{product.price}</td>
                    <td>
                      <button
                        className="btn"
                        onClick={() => deleteProduct(product.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">Inga produkter tillgängliga</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
