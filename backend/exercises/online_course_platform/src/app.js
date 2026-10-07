const express = require("express");
const routes = require("./routes");
const AppError = require("./utils/AppError");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use("/api", routes);

app.use((req, res, next) => {
  next(new AppError("Route not found", 404));
});

app.use(errorHandler);

module.exports = app;
