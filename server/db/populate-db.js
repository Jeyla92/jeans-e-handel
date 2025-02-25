const Database = require("better-sqlite3");
const db = new Database("db/database.db", { verbose: console.log });

const products = [
  {
    name: "Skinny Fit Jeans",
    brand: "Levis",
    price: "699 KR",
    description: "A stylish and comfortable pair of skinny fit jeans.",
    image: "/woman1.jpg",
    SKU: "SKI001",
    published_date: "2025-02-17",
    categories: ["Jeans"],
    url_slug: "skinny-fit-jeans",
  },
  {
    name: "Super Skinny Jeans",
    brand: "Guess",
    price: "749 KR",
    description: "Super skinny jeans that hug your legs for a sleek look.",
    image: "/woman7.jpg",
    SKU: "SKI002",
    published_date: "2025-02-10",
    categories: ["Jeans"],
    url_slug: "super-skinny-jeans",
  },
  {
    name: "Low Waist Bootcut Jeans",
    brand: "Tommy Hilfiger",
    price: "799 KR",
    description: "Classic bootcut jeans with a flattering low waist fit.",
    image: "/woman2.jpg",
    SKU: "BOO001",
    published_date: "2025-02-12",
    categories: ["Jeans"],
    url_slug: "low-waist-bootcut-jeans",
  },
  {
    name: "Stretch Bootcut Jeans",
    brand: "Diesel",
    price: "849 KR",
    description: "Stretchable low waist bootcut jeans for extra comfort.",
    image: "/woman3.jpg",
    SKU: "BOO002",
    published_date: "2025-02-19",
    categories: ["Jeans"],
    url_slug: "stretch-bootcut-jeans",
  },
  {
    name: "Relaxed Baggy Jeans",
    brand: "Lee",
    price: "899 KR",
    description: "Ultra-relaxed baggy jeans for a laid-back style.",
    image: "/woman5.jpg",
    SKU: "BAG001",
    published_date: "2025-02-20",
    categories: ["Jeans"],
    url_slug: "relaxed-baggy-jeans",
  },
  {
    name: "High Waist Mom Jeans",
    brand: "Levis",
    price: "799 KR",
    description: "Classic high-waisted mom jeans for a vintage look.",
    image: "/woman4.jpg",
    SKU: "HIG001",
    published_date: "2025-02-17",
    categories: ["Jeans"],
    url_slug: "high-waist-mom-jeans",
  },
  {
    name: "High Waist Straight Jeans",
    brand: "Tommy Hilfiger",
    price: "849 KR",
    description: "Straight-leg high-waisted jeans for a timeless silhouette.",
    image: "/woman6.jpg",
    SKU: "HIG002",
    published_date: "2025-02-18",
    categories: ["Jeans"],
    url_slug: "high-waist-straight-jeans",
  },
  {
    name: "High Waist Flared Jeans",
    brand: "Lee",
    price: "899 KR",
    description: "Flared high-waisted jeans for a retro-inspired outfit.",
    image: "/woman8.jpg",
    SKU: "HIG003",
    published_date: "2025-02-20",
    categories: ["Jeans"],
    url_slug: "high-waist-flared-jeans",
  },
];

const insertProduct = db.prepare(`
  INSERT INTO products (name, brand, price, description, image, SKU, categories, published_date, url_slug)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

try {
  products.forEach((product) => {
    insertProduct.run(
      product.name,
      product.brand,
      product.price,
      product.description,
      product.image,
      product.SKU,
      JSON.stringify(product.categories),
      product.published_date,
      product.url_slug
    );
    console.log(`Inserted ${product.name} into products table`);
  });
} catch (error) {
  console.error("Error inserting products:", error);
}

db.close();
