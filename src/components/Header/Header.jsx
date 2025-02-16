import "./Header.css";

export const Header = ({ cart }) => {
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
          placeholder="Sök bland produkter"
        />
      </div>
      <nav className="nav-container">
        <ul className="category-list">
          <li>
            <a href="#" className="category-link">
              Dam
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Herr
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Barn
            </a>
          </li>
          <li>
            <a href="#" className="category-link">
              Baby
            </a>
          </li>
        </ul>
      </nav>

      <div className="icon-container">
        <a href="#" className="icon-link">
          <i className="fa-regular fa-user"></i>
        </a>
        <a href="#" className="icon-link">
          <i className="fa-regular fa-heart"></i>
        </a>
        <a href="#" className="icon-link">
          <i className="fa-solid fa-cart-shopping"></i>
          <span className="cart-count">{cart.length}</span>
        </a>
      </div>
    </header>
  );
};
