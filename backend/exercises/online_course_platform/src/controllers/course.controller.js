const asyncHandler = require("../utils/asyncHandler");
const courseService = require("../services/courseService");

const listPublished = asyncHandler(async (req, res) => {
  const data = await courseService.listPublished(req.query);
  res.json({ success: true, data });
});

const getMy = asyncHandler(async (req, res) => {
  const data = await courseService.getMy(req.user.id);
  res.json({ success: true, data });
});

const getById = asyncHandler(async (req, res) => {
  const data = await courseService.getById(Number(req.params.id), req.user);
  res.json({ success: true, data });
});
const create = asyncHandler(async (req, res) => {
  const data = await courseService.create(req.body, req.user);
  res.status(201).json({ success: true, data });
});

const update = asyncHandler(async (req, res) => {
  const data = await courseService.update(
    Number(req.params.id),
    req.body,
    req.user,
  );
  res.json({ success: true, data });
});

const remove = asyncHandler(async (req, res) => {
  const data = await courseService.remove(Number(req.params.id), req.user);
  res.json({ success: true, data });
});

const getStudents = asyncHandler(async (req, res) => {
  const data = await courseService.getStudents(Number(req.params.id), req.user);
  res.json({ success: true, data });
});

module.exports = {
  listPublished,
  getMy,
  getById,
  create,
  update,
  remove,
  getStudents,
};
