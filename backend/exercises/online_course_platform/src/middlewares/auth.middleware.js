const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { verifyToken } = require("../utils/jwt");
const { User } = require("../models");
const AUTH_ERRORS = require("../constants/errors/auth.errors");

const getBearerToken = (req) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) return null;
  return header.slice(7).trim();
};

const authenticate = asyncHandler(async (req, res, next) => {
  const token = getBearerToken(req);

  if (!token) {
    throw new AppError(
      AUTH_ERRORS.TOKEN_MISSING.message,
      AUTH_ERRORS.TOKEN_MISSING.statusCode,
    );
  }
  let payload;
  try {
    payload = verifyToken(token);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError(
        AUTH_ERRORS.TOKEN_EXPIRED.message,
        AUTH_ERRORS.TOKEN_EXPIRED.statusCode,
      );
    }
    throw new AppError(
      AUTH_ERRORS.TOKEN_INVALID.message,
      AUTH_ERRORS.TOKEN_INVALID.statusCode,
    );
  }

  const user = await User.findByPk(payload.id);
  if (!user) {
    throw new AppError(
      AUTH_ERRORS.TOKEN_INVALID.message,
      AUTH_ERRORS.TOKEN_INVALID.statusCode,
    );
  }

  req.user = user;
  next();
});

const optionalAuthenticate = asyncHandler(async (req, res, next) => {
  const token = getBearerToken(req);
  if (!token) return next();

  try {
    const payload = verifyToken(token);
    const user = await User.findByPk(payload.id);
    if (user) req.user = user;
  } catch (error) {}
  next();
});
const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(
        new AppError(
          AUTH_ERRORS.FORBIDDEN.message,
          AUTH_ERRORS.FORBIDDEN.statusCode,
        ),
      );
    }
    next();
  };

module.exports = { authenticate, optionalAuthenticate, authorize };
