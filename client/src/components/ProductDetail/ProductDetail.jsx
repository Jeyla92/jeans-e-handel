import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ProductDetail.css";

export const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Hämtar produktens detaljer från API:t
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Fel vid hämtning av produkt:", error);
      }
    };

    // Hämtar liknande produkter från API:t
    const fetchSimilarProducts = async () => {
      try {
        const response = await fetch("/api/products");
        const data = await response.json();
        const shuffledProducts = data.sort(() => Math.random() - 0.5);
        setSimilarProducts(shuffledProducts.slice(0, 5));
      } catch (error) {
        console.error("Fel vid hämtning av liknande produkter:", error);
      }
    };

    fetchProduct();
    fetchSimilarProducts();
  }, [id]);

  if (!product) {
    return <h2 className="error-message">Laddar produkt....</h2>;
  }

  return (
    <div className="product-detail-container">
      <div className="product-main">
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h1>{product.name}</h1>
          <p className="brand">{product.brand}</p>
          <p className="price">{product.price}</p>
          <p className="description">{product.description}</p>
          <input
            value={quantity}
            type="number"
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button
            className="add-to-cart"
            onClick={() => addToCart(product, quantity)}
          >
            Lägg i varukorg
          </button>
        </div>
      </div>

      <h2 className="similar-products-title">Liknande produkter</h2>
      <div className="similar-products">
        {similarProducts.map((similar, index) => (
          <Link
            key={`${similar.id}-${index}`}
            to={`/products/${similar.id}`}
            className="similar-product-card"
          >
            <img
              src={similar.image}
              alt={similar.name}
              className="similar-product-image"
            />
            <p className="similar-product-name">{similar.name}</p>
            <p className="similar-product-price">{similar.price}</p>
            <p className="similar-product-brand">{similar.brand}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
