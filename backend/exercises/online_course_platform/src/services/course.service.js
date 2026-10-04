const { AppError } = require("../utils/AppError");
const { Course, Lesson, User } = require("../models");
const { ROLES } = require("../constants/roles");
const COURSE_ERRORS = reqauire("../constants/errors/course.errors.js");

const assertOwnerOrAdmin = (course, user) => {
  if (user.role !== ROLES.ADMIN && course.instructorId !== user.id) {
    throw new AppError(
      COURSE_ERRORS.NOT_OWNER.message,
      COURSE_ERRORS.NOT_OWNER.statusCode,
    );
  }
};

const listPublished = async ({ category, level }) => {
  const where = { isPublished: true };
  if (category) where.category = category;
  if (level) where.level = level;

  const courses = await Course.findAll({
    where,
    include: [
      {
        model: User,
        as: "instructor",
        attributes: ["id", "fullName", "email"],
      },
      {
        model: Lesson,
        as: "lessons",
        attributes: ["id"],
      },
    ],
    order: [["id", "ASC"]],
  });

  return courses.map((course) => {
    const data = course.toJSON();
    data.lessonCount = data.lessons.length;
    delete data.lessons;
    return data;
  });
};

const getById = async (id, user) => {
  const course = await Course.findByPk(id, {
    include: [
      {
        model: User,
        as: "instructor",
        attributes: ["id", "fullName", "email"],
      },
      {
        model: Lesson,
        as: "lessons",
        order: [["order", "ASC"]],
      },
    ],
  });

  if (!course) {
    throw new AppError(
      COURSE_ERRORS.NOT_FOUND.message,
      COURSE_ERRORS.NOT_FOUND.statusCode,
    );
  }

  if (!course.isPublished) {
    const canSee =
      user && (user.role === ROLES.ADMIN || course.instructorId === user.id);
    if (!canSee) {
      throw new AppError(
        COURSE_ERRORS.NOT_PUBLISHED.message,
        COURSE_ERRORS.NOT_PUBLISHED.statusCode,
      );
    }
  }

  const data = course.toJSON();
  data.lessons.sort((a, b) => a.order - b.order);
  return data;
};

const getMy = async (userId) =>
  Course.findAll({
    where: { instructorId: userId },
    include: [
      {
        model: User,
        as: "instructor",
        attributes: ["id", "fullName", "email"],
      },
      { model: Lesson, as: "lessons" },
    ],
    order: [["id", "ASC"]],
  });

const create = async (payload, user) => {
  if (Number(payload.price) < 0) {
    throw new AppError(
      COURSE_ERRORS.INVALID_PRICE.message,
      COURSE_ERRORS.INVALID_PRICE.statusCode,
    );
  }

  const course = await Course.create({
    title: payload.title.trim(),
    description: payload.description,
    category: payload.category.trim(),
    level: payload.level || "beginner",
    price: payload.price,
    isPublished: payload.isPublished ?? false,
    instructorId: user.id,
  });
  return getById(course.id, user);
};

const update = async (id, payload, user) => {
  const course = await Course.findByPk(id);
  if (!course) {
    throw new AppError(
      COURSE_ERRORS.NOT_FOUND.message,
      COURSE_ERRORS.NOT_FOUND.statusCode,
    );
  }
  assertOwnerOrAdmin(course, user);

  const allowed = [
    "title",
    "description",
    "category",
    "level",
    "price",
    "isPublished",
  ];
  const updates = {};
  if (payload.price !== undefined && Number(payload.price) < 0) {
    throw new AppError(
      COURSE_ERRORS.INVALID_PRICE.message,
      COURSE_ERRORS.INVALID_PRICE.statusCode,
    );
  }
  for (const key of allowed) {
    if (payload[key] !== undefined) updates[key] = payload[key];
  }
  if (updates.title) updates.title = updates.title.trim();
  if (updates.category) updates.category = updates.category.trim();

  await course.update(updates);
  return getById(course.id, user);
};

const remove = async (id, user) => {
  const course = await Course.findByPk(id);

  if (!course) {
    throw new AppError(
      COURSE_ERRORS.NOT_FOUND.message,
      COURSE_ERRORS.NOT_FOUND.statusCode,
    );
  }
  assertOwnerOrAdmin(course, user);
  await course.destroy();
  return { id: Number(id), deleted: true };
};

const getStudents = async (id, user) => {
  const course = await Course.findByPk(id, {
    include: [
      {
        model: User,
        as: "students",
        attributes: ["id", "fullName", "email"],
        through: { attributes: ["status", "progress", "enrolledAt"] },
      },
    ],
  });

  if (!course) {
    throw new AppError(
      COURSE_ERRORS.NOT_FOUND.message,
      COURSE_ERRORS.NOT_FOUND.statusCode,
    );
  }
  assertOwnerOrAdmin(course, user);

  return course;
};
module.exports = {
  listPublished,
  getById,
  getMy,
  create,
  update,
  remove,
  getStudents,
};
