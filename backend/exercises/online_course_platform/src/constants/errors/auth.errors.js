const AUTH_ERROR = {
  INVALID_CREDENTIALS: {
    statusCode: 401,
    message: "Invalid email or password",
  },
  TOKEN_MISSING: {
    statusCode: 401,
    message: "Authentication token is missing",
  },
  TOKEN_INVALID: {
    statusCode: 401,
    message: "Invalid authentication token",
  },
  TOKEN_EXPIRED: {
    statusCode: 401,
    message: "Authentication token expired",
  },
  FORBIDDEN: {
    statusCode: 403,
    message: "You do not have permission to perform this action",
  },
  VALIDATION_FAILED: { statusCode: 400, message: "Validation failed" },
};
module.exports = AUTH_ERROR;