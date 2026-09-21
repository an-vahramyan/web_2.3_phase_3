const express = require("express");
const { readData, writeData } = require("../utils/fileDB");
const authenticate = require("../middleware/authenticate");
const authorize = require("../middleware/authorize");
const crypto = require("node:crypto");
const router = express.Router();

router.get("/", (req, res) => {
  const products = readData("./data", "products.json");

  res.json(products);
});

router.get("/:id", (req, res) => {
  const products = readData("./data", "products.json");

  const product = products.find((p) => p.id === req.params.id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

router.post("/", authenticate, authorize("admin"), (req, res) => {
  const { name, price, category, stock } = req.body;

  if (!name || price === undefined || !category || stock === undefined) {
    return res.status(400).json({
      message: "name,price,category and stock are required",
    });
  }

  const products = readData("./data", "products.json");

  const product = {
    id: crypto.randomUUID(),
    name,
    price,
    category,
    stock,
  };

  products.push(product);

  writeData("./data", "products.json", products);

  res.status(201).json(product);
});

router.put("/:id", authenticate, authorize("admin"), (req, res) => {
  const products = readData("./data", "products.json");

  const productIndex = products.findIndex((p) => p.id === req.params.id);

  if (productIndex === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price, category, stock } = req.body;

  products[productIndex] = {
    ...products[productIndex],
    name: name ?? products[productIndex].name,
    price: price ?? products[productIndex].price,
    category: category ?? products[productIndex].category,
    stock: stock ?? products[productIndex].stock,
  };

  writeData("./data", "products.json", products);
  res.json(products[productIndex]);
});

router.delete(
  "/:id",
  authenticate,
  authorize("admin"),
  
  (req, res) => {
    const products = readData("./data", "products.json");

    const productIndex = products.findIndex((p) => p.id === req.params.id);

    if (productIndex === -1) {
      return res.status(404).json({ messgae: "product not found" });
    }

    products.splice(productIndex, 1);

    writeData("./data", "product.json", products);

    res.sendStatus(204);
  },
);
module.exports = router;
