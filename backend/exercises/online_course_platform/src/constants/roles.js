const ROLES = Object.freeze({
  ADMIN: "admin",
  INSTRUCTOR: "instructor",
  STUDENT: "student",
});

const ALL_ROLES = Object.values(ROLES);

module.exports = { ROLES, ALL_ROLES };
