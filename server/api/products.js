const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("db/database.db");

// Middleware för att logga varje request
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Endpoint för att hämta alla produkter
router.get("/", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM products");
    const products = stmt.all();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", (req, res) => {
  try {
    const stmt = db.prepare("SELECT * FROM products WHERE id = ?");
    const product = stmt.get(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", (req, res) => {
  const { name, description, image, SKU, price, published_date, categories } =
    req.body;
  if (
    !name ||
    !description ||
    !image ||
    !SKU ||
    !price ||
    !published_date ||
    !categories
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const stmt = db.prepare(`
      INSERT INTO products (name, description, image, SKU, price, published_date, categories)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      name,
      description,
      image,
      SKU,
      price,
      published_date,
      JSON.stringify(categories)
    );
    res.status(201).json({
      id: result.lastInsertRowid,
      name,
      description,
      image,
      SKU,
      price,
      published_date,
      categories,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  try {
    const stmt = db.prepare("DELETE FROM products WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes > 0) {
      res.status(200).json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
