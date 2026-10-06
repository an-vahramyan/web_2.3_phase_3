const express = require("express");
const controller = require("../controllers/user.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants/roles");
const { role, idParam } = require("../middlewares/validate.middleware");

const router = express.Router();
router.use(authenticate, authorize(ROLES.ADMIN));
router.get("/", controller.list);
router.get("/:id", idParam, controller.getById);
router.patch("/:id/role", role, controller.changeRole);
router.delete("/:id", idParam, controller.remove);

module.exports = router;
