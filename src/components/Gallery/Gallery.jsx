import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css';

export const products = [
    { id: "denim-klänning", name: "Denim Klänning", price: "499 SEK", brand: "Levis", image: "/denim klänning.png", publishedDate: "2024-02-14" },
    { id: "jeans-1", name: "Blå Straight Jeans", price: "499 SEK", brand: "Levis", image: "/jeans 1.jpg", publishedDate: "2024-02-10" },
    { id: "oversized-denim", name: "Oversized Denim Skjorta", price: "399 SEK", brand: "Levis", image: "/Jeans skjorta.png", publishedDate: "2024-02-05" },
    { id: "jeansjacka", name: "Jeansjacka", price: "599 SEK", brand: "Levis", image: "/jeansjacka.png", publishedDate: "2024-02-12" },
    { id: "denim-shorts", name: "Denim Shorts", price: "249 SEK", brand: "Levis", image: "/jeansshorts.png", publishedDate: "2024-02-02" },
    { id: "baggy-jeans", name: "Baggy Jeans", price: "549 SEK", brand: "Levis", image: "/oversize jeans.png", publishedDate: "2024-02-11" },
    { id: "ljusa-jeans", name: "Ljusblå Jeans", price: "469 SEK", brand: "Levis", image: "/relaxed jeans.png", publishedDate: "2024-02-06" },
    { id: "streetwear-jeans", name: "Streetwear Jeans", price: "519 SEK", brand: "Levis", image: "/tattered jeans.png", publishedDate: "2024-02-03" }
];

export const Gallery = () => {
    const [favorites, setFavorites] = useState([]);

    const toggleFavorite = (id) => {
        setFavorites((prev) =>
            prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
        );
    };

    // Här sorterar jag produkterna efter publiceringsdatum (senaste först)
    const sortedProducts = [...products].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));

    return (
        <div className="gallery">
            {sortedProducts.map((product, index) => (
                <div key={product.id} className="card">
                    <div className="image-container">
                    <Link to={`/products/${product.id}`}>
                        <img src={product.image} alt={product.name} className="card-image" />
                    </Link>
                        
                        {index === 0 && <span className="badge">Nyhet</span>}
                        <button 
                            className={`heart-button ${favorites.includes(product.id) ? 'favorited' : ''}`} 
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
