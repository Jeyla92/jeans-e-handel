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

module.exports = router;
