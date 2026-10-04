const { Op } = require("sequelize");
const AppError = require("../utils/AppError");
const { Course, Lesson, Enrollment } = require("../models");
const { ROLES } = require("../constants/roles");
const LESSON_ERRORS = require("../constants/errors/lesson.errors");
const COURSE_ERRORS = require("../constants/errors/course.errors");

const getCourse = async (courseId) => {
  const course = await Course.findByPk(courseId);
  if (!course) {
    throw new AppError(
      COURSE_ERRORS.NOT_FOUND.message,
      COURSE_ERRORS.NOT_FOUND.statusCode,
    );
  }
  return course;
};

const assertMutationAccess = (course, user) => {
  if (user.role !== ROLES.ADMIN && course.instructorId !== user.id) {
    throw new AppError(
      LESSON_ERRORS.NOT_OWNER.message,
      LESSON_ERRORS.NOT_OWNER.statusCode,
    );
  }
};

const assertReadAccess = async (course, user) => {
  if (user.role === ROLES.ADMIN || course.instructorId === user.id) return;

  const enrollment = await Enrollment.findOne({
    where: {
      userId: user.id,
      courseId: course.id,
      status: { [Op.in]: ["active", "completed"] },
    },
  });

  if (!enrollment) {
    throw new AppError(
      LESSON_ERRORS.NOT_ENROLLED.message,
      LESSON_ERRORS.NOT_ENROLLED.statusCode,
    );
  }
};

const list = async (courseId, user) => {
  const course = await getCourse(courseId);
  await assertReadAccess(course, user);
  return Lesson.findAll({ where: { courseId }, order: [["order", "ASC"]] });
};

const getById = async (id, user) => {
  const lesson = await Lesson.findByPk(id);
  if (!lesson) {
    throw new AppError(
      LESSON_ERRORS.NOT_FOUND.message,
      LESSON_ERRORS.NOT_FOUND.statusCode,
    );
  }

  const course = await getCourse(lesson.courseId);
  await assertReadAccess(course, user);
  return lesson;
};

const create = async (courseId, payload, user) => {
  const course = await getCourse(courseId);
  assertMutationAccess(course, user);

  const exists = await Lesson.findOne({
    where: { courseId, order: payload.order },
  });
  if (exists) {
    throw new AppError(
      LESSON_ERRORS.ORDER_EXISTS.message,
      LESSON_ERRORS.ORDER_EXISTS.statusCode,
    );
  }
  if (payload.duration <= 0) {
    throw new AppError(
      LESSON_ERRORS.INVALID_DURATION.message,
      LESSON_ERRORS.INVALID_DURATION.statusCode,
    );
  }
  return Lesson.create({ ...payload, courseId });
};

const update = async (id, payload, user) => {
  const lesson = await Lesson.findByPk(id);

  if (!lesson) {
    throw new AppError(
      LESSON_ERRORS.NOT_FOUND.message,
      LESSON_ERRORS.NOT_FOUND.statusCode,
    );
  }
  const course = await getCourse(lesson.courseId);
  assertMutationAccess(course, user);

  if (payload.order !== undefined && payload.order !== lesson.order) {
    const exists = await Lesson.findOne({
      where: {
        courseid: lesson.courseId,
        order: payload.order,
        id: { [Op.ne]: lesson.id },
      },
    });
    if (exists) {
      throw new AppError(
        LESSON_ERRORS.ORDER_EXISTS.message,
        LESSON_ERRORS.ORDER_EXISTS.statusCode,
      );
    }
  }

  if (payload.duration !== undefined && payload.duration <= 0) {
    throw new AppError(
      LESSON_ERRORS.INVALID_DURATION.message,
      LESSON_ERRORS.INVALID_DURATION.statusCode,
    );
  }
  await lesson.update(payload);
  return lesson;
};

const remove = async (id, user) => {
  const lesson = await Lesson.findByPk(id);

  if (!lesson) {
    throw new AppError(
      LESSON_ERRORS.NOT_FOUND.message,
      LESSON_ERRORS.NOT_FOUND.statusCode,
    );
  }
  const course = await getCourse(lesson.courseId);

  assertMutationAccess(course, user);
  await lesson.destroy();
  return { id: Number(id), deleted: true };
};

module.exports = { list, getById, create, update, remove };
