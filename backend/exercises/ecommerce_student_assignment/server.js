require("dotenv").config();
const express = require("express");
const router = require("./routes/auth.js");
const productsRouter = require("./routes/products.js");
const ordersRouter = require("./routes/orders.js");
const app = express();

app.use(express.json());
app.use("/auth", router);
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
