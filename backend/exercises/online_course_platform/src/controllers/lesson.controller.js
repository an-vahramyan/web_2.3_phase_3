const asyncHandler = require("../utils/asyncHandler");
const lessonService = require("../services/lesson.service");

const list = asyncHandler(async (req, res) => {
  const data = await lessonService.list(Number(req.params.courseId), req.user);
  res.json({ success: true, data });
});

const getById = asyncHandler(async (req, res) => {
  const data = await lessonService.getById(Number(req.params.id), req.user);
  res.json({ success: true, data });
});

const create = asyncHandler(async (req, res) => {
  const data = await lessonService.create(
    Number(req.params.courseId),
    req.body,
    req.user,
  );
  res.status(201).json({ success: true, data });
});

const update = asyncHandler(async (req, res) => {
  const data = await lessonService.update(
    Number(req.params.id),
    req.body,
    req.user,
  );
  res.json({ success: true, data });
});

const remove = asyncHandler(async (req, res) => {
  const data = await lessonService.remove(Number(req.params.id), req.user);
  res.json({ success: true, data });
});

module.exports = { list, getById, create, update, remove };
