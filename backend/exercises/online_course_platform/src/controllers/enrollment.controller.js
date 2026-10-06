const asyncHandler = require("../utils/asyncHandler");
const enrollmentService = require("../services/enrollment.service");

const create = asyncHandler(async (req, res) => {
  const data = await enrollmentService.enroll(
    req.user.id,
    Number(req.body.courseId),
  );
  res.status(201).json({ success: true, data });
});

const my = asyncHandler(async (req, res) => {
  const data = await enrollmentService.getMy(req.user.id);
  res.json({ success: true, data });
});

const progress = asyncHandler(async (req, res) => {
  const data = await enrollmentService.updateProgress(
    Number(req.params.id),
    req.user.id,
    Number(req.body.progress),
  );
  res.json({ success: true, data });
});

const cancel = asyncHandler(async (req, res) => {
  const data = await enrollmentService.cancel(Number(req.params.id), req.user);
  res.json({ success: true, data });
});

const listAll = asyncHandler(async (req, res) => {
  const data = await enrollmentService.listAll();
  res.json({ success: true, data });
});

module.exports = { create, my, progress, cancel, listAll };
