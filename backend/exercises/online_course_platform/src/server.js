const app = require("./app");
const { sequelize, ensureDatabaseExists } = require("./config/database");
require("./models");
const { PORT } = require("./config/env");

const start = async () => {
  try {
    await ensureDatabaseExists();
    await sequelize.authenticate();
    console.log("Database connected");

    await sequelize.sync({ alter: true });
    console.log("Models synchronized");

    app.listen(PORT, () => {
      console.log(`Server on port ${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
};

start();
