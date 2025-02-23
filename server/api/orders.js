const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("db/database.db");

// Middleware för att logga varje request
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.get("/", (req, res) => {
  const cart = db
    .prepare(
      `
    SELECT p.id, p.name, p.price, p.image, o.quantity, o.total_price
    FROM orders o
    JOIN products p ON o.product_id = p.id
  `
    )
    .all();
  res.json(cart);
});

router.post("/add", (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || isNaN(quantity)) {
    return res.json({
      success: false,
      message: "Produkt-ID eller antal saknas eller är ogiltigt",
    });
  }

  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(productId);

  if (product) {
    const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);
    try {
      db.prepare(
        "INSERT INTO orders (product_id, quantity, total_price, order_date) VALUES (?, ?, ?, ?)"
      ).run(productId, quantity, totalPrice, new Date().toISOString());
      res.json({ success: true });
    } catch (error) {
      console.error("Fel vid insättning i databasen:", error.message);
      res.status(500).json({ success: false, message: "Databasfel" });
    }
  } else {
    res.json({ success: false, message: "Produkten finns inte" });
  }
});

router.delete("/remove", (req, res) => {
  const productId = parseInt(req.query.productId);

  if (isNaN(productId)) {
    return res
      .status(400)
      .json({ success: false, message: "Ogiltigt Product ID" });
  }

  try {
    const result = db
      .prepare("DELETE FROM orders WHERE product_id = ?")
      .run(productId);

    if (result.changes > 0) {
      res.json({ success: true });
    } else {
      res.json({
        success: false,
        message: "Ingen produkt hittades att ta bort",
      });
    }
  } catch (error) {
    console.error("Fel vid borttagning:", error);
    res.status(500).json({ success: false, message: "Serverfel" });
  }
});

module.exports = router;
