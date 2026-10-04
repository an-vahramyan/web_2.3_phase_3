const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const { User } = require("../models");
const USER_ERRORS = require("../constants/errors/user.errors");
const AUTH_ERRORS = require("../constants/errors/auth.errors");
const { generateToken } = require("../utils/jwt");

const toPublicUser = (user) => {
  const data = user.toJSON();
  delete data.password;
  return data;
};

const register = async ({ fullName, email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const existing = await User.unscoped().findOne({
    where: { email: normalizedEmail },
  });
  if (existing) {
    throw new AppError(
      USER_ERRORS.EMAIL_EXISTS.message,
      USER_ERRORS.EMAIL_EXISTS.statusCode,
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    fullName: fullName.trim(),
    email: normalizedEmail,
    password: hashedPassword,
  });
  return toPublicUser(user);
};

const login = async ({ email, password }) => {
  const normalizedEmail = email.trim().toLowerCase();
  const user = await User.unscoped().findOne({
    where: { email: normalizedEmail },
  });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError(
      AUTH_ERRORS.INVALID_CREDENTIALS.message,
      AUTH_ERRORS.INVALID_CREDENTIALS.statusCode,
    );
  }

  return {
    token: generateToken(user),
    user: toPublicUser(user),
  };
};

const me = async (userId) => {
  const user = await User.findByPk(userId);
  if (!user) {
    throw new AppError(
      USER_ERRORS.NOT_FOUND.message,
      USER_ERRORS.NOT_FOUND.statusCode,
    );
  }

  return user;
};
module.exports = { register, login, me };
