const { Sequelize } = require("sequelize");
const { Client } = require("pg");
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_DIALECT,
} = require("./env");

const quoteIdentifier = (name) => `"${name.replace(/"/g, "")}"`;

const ensureDatabaseExists = async () => {
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: "postgres",
  });
  await client.connect();

  try {
    const result = await client.query(
      "SELECT 1 FROM pg_database WHERE datname = $1",
      [DB_NAME],
    );
    if (result.rowCount === 0) {
      await client.query(`CREATE DATABASE ${quoteIdentifier(DB_NAME)}`);
    }
  } finally {
    await client.end();
  }
};
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: DB_DIALECT,
  logging: false,
});
module.exports = { sequelize, ensureDatabaseExists };
