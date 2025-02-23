const express = require("express");
const productsRouter = require("./api/products");
const ordersRouter = require("./api/orders");

const app = express();
app.use(express.json());
// Använd middleware för att hantera /products endpoints
app.use("/api/products", productsRouter);
app.use("/api/cart", ordersRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
