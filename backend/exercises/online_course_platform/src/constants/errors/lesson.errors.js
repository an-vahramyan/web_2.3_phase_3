const LESSON_ERRORS = {
  NOT_FOUND: { statusCode: 404, message: "Lesson not found" },
  ORDER_EXISTS: {
    statusCode: 409,
    message: "Lesson order already exists in this course",
  },
  NOT_ENROLLED: {
    statusCode: 403,
    message: "You must be enrolled to view this lesson",
  },
  INVALID_DURATION: {
    statusCode: 400,
    message: "Lesson duration must be greater than 0",
  },
  NOT_OWNER: {
    statusCode: 403,
    message: "You can only modify lessons in your own courses",
  },
};

module.exports = LESSON_ERRORS;
