import "./Footer.css";
export const Footer = () => {
  return (
    <footer>
      <div className="fetures-container">
        <div className="feature">
          <i className="fas fa-fire feature-icon"></i>
          <p className="feature-title">Nyheter varje dag</p>
        </div>
        <div className="feature">
          <i className="fa-solid fa-truck feature-icon"></i>
          <p className="feature-title">Snabbleverans 1-2 arbetsdagar</p>
        </div>

        <div className="feature">
          <i className="fas fa-box feature-icon"></i>
          <p className="feature-title">Fri frakt över 499 kr</p>
        </div>

        <div className="feature">
          <i className="fas fa-recycle feature-icon"></i>
          <p className="feature-title">Fri retur vid ny order</p>
        </div>
      </div>

      <div className="footer-container">
        <div className="jeans-club">
          <h2>Jeans Club</h2>
          <p>
            Som medlem i Jeans Club får du 10% rabatt på ditt första köp. Du får
            unika erbjudanden, alltid fri frakt (till ombud) vid köp över 500 kr
            samt samlar poäng på alla köp och aktiviteter.
          </p>
          <button className="join-button">Bli medlem →</button>
          <h3>Följ oss på</h3>
          <a
            href="https://github.com/amela99"
            target="_blank"
            className="social-icon"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Hjälp</h3>
            <ul>
              <li>
                <a href="#">Kundservice</a>
              </li>
              <li>
                <a href="#">Vanliga frågor</a>
              </li>
              <li>
                <a href="#">Beställning</a>
              </li>
              <li>
                <a href="#">Personal Styling</a>
              </li>
              <li>
                <a href="#">Kontakta oss</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Om JA Jeans</h3>
            <ul>
              <li>
                <a href="#">Om oss</a>
              </li>
              <li>
                <a href="#">Hållbarhet</a>
              </li>
              <li>
                <a href="#">Karriär</a>
              </li>
              <li>
                <a href="#">Press & Nyheter</a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Populära länkar</h3>
            <ul>
              <li>
                <a href="#">Logga in</a>
              </li>
              <li>
                <a href="#">Hitta butik</a>
              </li>
              <li>
                <a href="#">Studentrabatt</a>
              </li>
              <li>
                <a href="#">Jeans Club</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="copyright">Copyright &copy; 2025 by JA Jeans</div>
    </footer>
  );
};
