require("dotenv").config();

const required = (name) => {
  const value = process.env[name];
  if (value === undefined || value === "") {
    throw new Error(`Missing environment variable:${name}`);
  }
  return value;
};
const PORT = Number(process.env.PORT || 3000);
module.exports = {
  PORT,
  DB_HOST: required("DB_HOST"),
  DB_PORT: Number(process.env.DB_PORT || 5432),
  DB_NAME: required("DB_NAME"),
  DB_USER: required("DB_USER"),
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_DIALECT: process.env.DB_DIALECT || "postgres",
  JWT_SECRET: required("JWT_SECRET"),
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
};
