import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export const Header = ({ cart }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`/search?q=${searchTerm}`);
    }
  };

  return (
    <header>
      <Link to="/">
        <img className="logo" src="/logo.png" alt="JA Jeans logo" />
      </Link>
      <div className="search-container">
        <i className="fa-solid fa-magnifying-glass"></i>
        <input
          type="text"
          className="search-input"
          placeholder="Sök produkt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearch} // 🔎 Navigerar till söksidan vid Enter
        />
      </div>
      <div className="icon-container">
        <Link to="/user" className="icon-link">
          <i className="fa-regular fa-user" />
        </Link>
        <Link to="/" className="icon-link">
          <i className="fa-regular fa-heart" />
        </Link>
        <Link to="/shoppingcart" className="icon-link">
          <i className="fa-solid fa-cart-shopping" />
          <span className="cart-count">{cart.length}</span>
        </Link>
      </div>
    </header>
  );
};
