const express = require("express");
const controller = require("../controllers/course.controller");
const {
  authenticate,
  optionalAuthenticate,
  authorize,
} = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants/roles");
const validators = require("../middlewares/validate.middleware");

const router = express.Router();

router.get("/", validators.courseFilters, controller.listPublished);
router.get("/my", authenticate, authorize(ROLES.INSTRUCTOR), controller.getMy);
router.get(
  "/:id/students",
  authenticate,
  authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
  validators.idParam,
  controller.getStudents,
);
router.get(
  "/:id",
  optionalAuthenticate,
  validators.idParam,
  controller.getById,
);
router.post(
  "/",
  authenticate,
  authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
  validators.courseCreate,
  controller.create,
);
router.put(
  "/:id",
  authenticate,
  authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
  validators.courseUpdate,
  controller.update,
);
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.INSTRUCTOR, ROLES.ADMIN),
  validators.idParam,
  controller.remove,
);
module.exports = router;
