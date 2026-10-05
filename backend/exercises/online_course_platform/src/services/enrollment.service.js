const AppError = require("../utils/AppError");
const { Course, Enrollment, User } = require("../models");
const { ROLES } = require("../constants/roles");
const ENROLLMENT_ERRORS = require("../constants/errors/enrollment.errors");

const enroll = async (userId, courseId) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw new AppError(
      ENROLLMENT_ERRORS.NOT_FOUND.message,
      ENROLLMENT_ERRORS.NOT_FOUND.statusCode,
    );
  }
  if (!course.isPublished) {
    throw new AppError(
      ENROLLMENT_ERRORS.NOT_FOUND.message,
      ENROLLMENT_ERRORS.NOT_FOUND.statusCode,
    );
  }
  if (course.instructorId === userId) {
    throw new AppError(
      ENROLLMENT_ERRORS.OWN_COURSE.message,
      ENROLLMENT_ERRORS.OWN_COURSE.statusCode,
    );
  }

  const existing = await Enrollment.findOne({ where: { userId, courseId } });
  if (existing) {
    throw new AppError(
      ENROLLMENT_ERRORS.ALREADY_ENROLLED.message,
      ENROLLMENT_ERRORS.ALREADY_ENROLLED.statusCode,
    );
  }
  return Enrollment.create({ userId, courseId });
};

const getMy = async (userId) =>
  Enrollment.findAll({
    where: { userId },
    include: [
      {
        model: Course,
        as: "course",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "fullName", "email"],
          },
        ],
      },
    ],

    order: [["enrolledAt", "DESC"]],
  });

const updateProgress = async (id, userId, progress) => {
  const enrollment = await Enrollment.findByPk(id);
  if (!enrollment) {
    throw new AppError(
      ENROLLMENT_ERRORS.NOT_FOUND.message,
      ENROLLMENT_ERRORS.NOT_FOUND.statusCode,
    );
  }
  if (enrollment.userId !== userId) {
    throw new AppError(
      ENROLLMENT_ERRORS.NOT_OWNER.message,
      ENROLLMENT_ERRORS.NOT_OWNER.statusCode,
    );
  }
  if (enrollment.status === "cancelled" || progress < 0 || progress > 100) {
    throw new AppError(
      ENROLLMENT_ERRORS.INVALID_PROGRESS.message,
      ENROLLMENT_ERRORS.INVALID_PROGRESS.statusCode,
    );
  }
  enrollment.progress = progress;
  enrollment.status = progress === 100 ? "completed" : "active";
  await enrollment.save();
  return enrollment;
};
const cancel = async (id, user) => {
  const enrollment = await Enrollment.findByPk(id);
  if (!enrollment) {
    throw new AppError(
      ENROLLMENT_ERRORS.NOT_FOUND.message,
      ENROLLMENT_ERRORS.NOT_FOUND.statusCode,
    );
  }
  if (user.role !== ROLES.ADMIN && enrollment.userId !== user.id) {
    throw new AppError(
      ENROLLMENT_ERRORS.NOT_OWNER.message,
      ENROLLMENT_ERRORS.NOT_OWNER.statusCode,
    );
  }

  enrollment.status = "cancelled";
  await enrollment.save();
  return enrollment;
};

const listAll = async () =>
  Enrollment.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["id", "fullName", "email", "role"],
      },
      {
        model: Course,
        as: "course",
        include: [
          {
            model: User,
            as: "instructor",
            attributes: ["id", "fullName", "email"],
          },
        ],
      },
    ],
    order: [["id", "ASC"]],
  });
module.exports = { enroll, getMy, updateProgress, cancel, listAll };
