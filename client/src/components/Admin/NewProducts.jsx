import React, { useState } from "react";
import "./NewProducts.css";

export const NewProducts = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [urlToImage, setUrlToImage] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [categories, setCategories] = useState({
    bootcut: false,
    wide: false,
    regular: false,
    skinny: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCategories((prevCategories) => ({
      ...prevCategories,
      [name]: checked,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const product = {
      name,
      description,
      image: urlToImage,
      SKU,
      price,
      published_date: publishedDate,
      categories: Object.keys(categories).filter((key) => categories[key]),
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to save product");
      }

      const data = await response.json();
      console.log("Product saved:", data);
      window.location.href = "/Admin/Products";
    } catch (error) {
      console.error("Error:", error);
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
            <h2 className="section-title">Ny produkt</h2>
          </div>

          <form className="product-form" onSubmit={handleSubmit}>
            <label>Titel</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ange produktnamn"
              required
              maxLength="15"
            />

            <label>Beskrivning</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ange beskrivning."
              required
              maxLength="50"
            ></textarea>

            <label htmlFor="urlToImage">Bild</label>
            <input
              type="text"
              value={urlToImage}
              onChange={(e) => setUrlToImage(e.target.value)}
              placeholder="Ange URL"
              required
            />

            <label>
              <strong>Sku</strong>
            </label>
            <input
              type="text"
              value={SKU}
              onChange={(e) => setSKU(e.target.value)}
              placeholder="ABC123"
              pattern="[A-Za-z]{3}[0-9]{3}"
              title="SKU must be in the format: 3 letters followed by 3 digits (e.g., ABC123)"
              required
            />

            <label>Pris</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Ange pris"
              required
              maxLength="10"
            />

            <label>Publiceringsdatum</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
            />

            <h4>Katergorier</h4>
            <div className="checkbox-group">
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="bootcut"
                  name="bootcut"
                  checked={categories.bootcut}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="bootcut">Bootcut Jeans</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="wide"
                  name="wide"
                  checked={categories.wide}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="wide">Wide leg Jeans</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="regular"
                  name="regular"
                  checked={categories.regular}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="regular">Regular fit Jeans</label>
              </div>
              <div className="checkbox-item">
                <input
                  type="checkbox"
                  id="skinny"
                  name="skinny"
                  checked={categories.skinny}
                  onChange={handleCheckboxChange}
                />
                <label htmlFor="skinny">Skinny Jeans</label>
              </div>
            </div>
            <button type="submit">Lägg till</button>
          </form>
        </div>
      </div>
    </div>
  );
};
