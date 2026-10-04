const USER_ERRORS = {
  NOT_FOUND: { statusCode: 404, message: "User not found" },
  EMAIL_EXISTS: { statusCode: 409, message: "Email is already registered" },
  INVALID_ROLE: { statusCode: 400, message: "Invalid role" },
  CANNOT_DELETE_SELF: {
    statusCode: 400,
    message: "You cannot delete your own account",
  },
  CANNOT_CHANGE_SELF: {
    statusCode: 400,
    message: "You cannot change your own role",
  },
};

module.exports = USER_ERRORS;
