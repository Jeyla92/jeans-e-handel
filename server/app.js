const express = require("express");
const productsRouter = require("./api/products");

const app = express();
// Använd middleware för att hantera /products endpoints
app.use("/api/products", productsRouter);

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
