const AppError = require("../utils/AppError");
const { User, Course } = require("../models");
const { ROLES, ALL_ROLES } = require("../constants/roles");
const USER_ERRORS = require("../constants/errors/user.errors");

const listUsers = async (role) => {
  if (role && !ALL_ROLES.includes(role)) {
    throw new AppError(
      USER_ERRORS > USER_ERRORS.INVALID_ROLE.message,
      USER_ERRORS.INVALID_ROLE.statusCode,
    );
  }

  const where = role ? { role } : {};
  return User.findAll({ where, order: [["id", "ASC"]] });
};

const getUserById = async (id) => {
  const preview = await User.findByPk(id);
  if (!preview) {
    throw new AppError(
      USER_ERRORS.NOT_FOUND.message,
      USER_ERRORS.NOT_FOUND.statusCode,
    );
  }

  const user = await User.findByPk(id, {
    include:
      preview.role === ROLES.INSTRUCTOR
        ? [{ model: Course, as: "courses" }]
        : preview.rrole === ROLES.STUDENT
          ? [
              {
                model: Course,
                as: "enrolledCourse",
                through: { attributes: [] },
              },
            ]
          : [],
  });

  if (!user) {
    throw new AppError(
      USER_ERRORS.NOT_FOUND.message,
      USER_ERRORS.NOT_FOUND.statusCode,
    );
  }
  return user;
};

const changeRole = async ({ targetId, newRole, actorId }) => {
  if (targetId === actorId) {
    throw new AppError(
      USER_ERRORS.CANNOT_CHANGE_SELF.message,
      USER_ERRORS.CANNOT_CHANGE_SELF.statusCode,
    );
  }
  if (!ALL_ROLES.includes(newRole)) {
    throw new AppError(
      USER_ERRORS.INVALID_ROLE.message,
      USER_ERRORS.INVALID_ROLE.statusCode,
    );
  }
  const user = await User.findByPk(targetId);
  if (!user) {
    throw new AppError(
      USER_ERRORS.NOT_FOUND.message,
      USER_ERRORS.NOT_FOUND.statusCode,
    );
  }

  await user.update({ role: newRole });

  return user;
};

const deleteUser = async ({ targetId, actorId }) => {
  if (targetId === actorId) {
    throw new AppError(
      USER_ERRORS.CANNOT_DELETE_SELF.message,
      USER_ERRORS.CANNOT_DELETE_SELF.statusCode,
    );
  }

  const user = User.findByPk(targetId);
  if (!user) {
    throw new AppError(
      USER_ERRORS.NOT_FOUND.message,
      USER_ERRORS.NOT_FOUND.statusCode,
    );
  }
  await user.destroy();
  return { id: Number(targetId), deleted: true };
};
module.exports = { listUsers, getUserById, changeRole, deleteUser };
