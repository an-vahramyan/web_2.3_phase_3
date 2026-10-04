const {
  ValidationError,
  UniqueConstraintError,
  ForeignKeyConstraintError,
} = require("sequelize");
const AppError = require("../utils/AppError");
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({
      success: false,
      statusCode: 409,
      message: "A resource with the same unique value already exists",
    });
  }
  if (err instanceof ForeignKeyConstraintError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Referenced resource does not exist",
    });
  }
  if (err instanceof ValidationError) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: err.errors.map((item) => item.message).join("; "),
    });
  }
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Invalid authentication token",
    });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "Authentication token expired",
    });
  }
  console.error("Unhandled error:", err);
  return res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Something went wrong",
  });
};
module.exports = errorHandler;
