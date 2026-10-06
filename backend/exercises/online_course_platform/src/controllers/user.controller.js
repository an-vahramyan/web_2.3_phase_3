const asyncHandler = require("../utils/asyncHandler");
const userService = require("../services/user.service");

const list = asyncHandler(async (req, res) => {
  const users = await userService.listUsers(req.query.role);
  res.json({ seccess: true, data: users });
});

const getById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.json({ success: true, data: user });
});

const changeRole = asyncHandler(async (req, res) => {
  const user = await userService.changeRole({
    targetId: Number(req.params.id),
    newRole: req.body.role,
    actorId: req.user.id,
  });
  res.json({ success: true, data: user });
});
const remove = asyncHandler(async (req, res) => {
  const result = await userService.deleteUser({
    targetId: Number(req.params.id),
    actorId: req.user.id,
  });
  res.json({ success: true, data: result });
});

module.exports = { list, getById, changeRole, remove };
