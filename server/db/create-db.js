const Database = require("better-sqlite3");
const db = new Database("db/database.db", { verbose: console.log });

const createTable = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    brand TEXT,
    price TEXT,
    description TEXT,
    image TEXT,
    SKU TEXT,
    categories TEXT,
    published_date TEXT,
    url_slug TEXT UNIQUE
  );
`;

try {
  db.prepare(createTable).run();
  console.log("Products table created (if it didn't exist).");
} catch (err) {
  console.error("Error creating table:", err.message);
}

// Stäng databasen när du är klar
db.close();
