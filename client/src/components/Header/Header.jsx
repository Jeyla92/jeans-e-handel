import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      <a href="/">
        <img className="logo" src="/logo.png" alt="JA Jeans logo" />
      </a>
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
        <a href="#" className="icon-link"><i className="fa-regular fa-user"></i></a>
        <a href="#" className="icon-link"><i className="fa-regular fa-heart"></i></a>
        <a href="#" className="icon-link">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cart.length}</span>
        </a>
      </div>
    </header>
  );
};
