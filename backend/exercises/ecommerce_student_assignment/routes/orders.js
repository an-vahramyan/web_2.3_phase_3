const express = require("express");
const crypto = require("node:crypto");
const { readData, writeData } = require("../utils/fileDB");
const authenticate = require("../middleware/authenticate");
const router = express.Router();

router.post("/", authenticate, (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      message: "items are required",
    });
  }

  const products = readData("./data", "products.json");
  const orders = readData("./data", "orders.json");

  for (const item of items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      return res
        .status(404)
        .json({ message: `Product ${item.productId} not found` });
    }
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      return res.status(400).json({
        message: "Quantity must be positive intager",
      });
    }
    if (product.stock < item.quantity) {
      return res.status(400).json({
        message: `Not enough stock for ${product.name}`,
      });
    }
  }

  const orderItems = items.map((item) => {
    const product = products.find((p) => p.id === item.productId);

    product.stock -= item.quantity;

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity,
    };
  });

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const order = {
    id: crypto.randomUUID(),
    userId: req.user.id,
    items: orderItems,
    total,
    createdAt: new Date().toISOString(),
  };

  orders.push(order);

  writeData("./data", "products.json", products);
  writeData("./data", "orders.json", orders);

  res.status(201).json(order);
});

router.get("/", authenticate, (req, res) => {
  const orders = readData("./data", "orders.json");

  const myOrders = orders.filter((order) => order.userId === req.user.id);

  res.json(myOrders);
});

router.get("/id", authenticate, (req, res) => {
  const orders = readData("./data", "orders.json");

  const order = orders.find((order) => order.id === req.params.id);

  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }

  if (order.userId !== req.user.id && req.user.role != "admin") {
    return res.sendStatus(403);
  }

  res.json(order);
});

module.exports = router;
