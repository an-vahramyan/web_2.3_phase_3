const { NOT_OWNER } = require("./course.errors");

const ENROLLMENT_ERRORS = {
  NOT_FOUND: { statusCode: 404, message: "Enrollment or course not found" },
  ALREADY_ENROLLED: {
    statusCode: 409,
    message: "You are already enrolled in this course",
  },
  OWN_COURSE: {
    statusCode: 400,
    message: "You cannot enroll in your own course",
  },
  INVALID_PROGRESS: {
    statusCode: 400,
    message:
      "Progress must be between 0 and 100 and the enrolllment must be active",
  },
  NOT_OWNER: {
    statusCode: 403,
    message: "You can only modify your own enrollment",
  },
};

module.exports = ENROLLMENT_ERRORS;
