const express = require("express");
const controller = require("../controllers/lesson.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants/roles");
const validators = require("../middlewares/validate.middleware");

const router = express.Router();
router.use(
  authenticate,
  authorize(ROLES.STUDENT, ROLES.INSTRUCTOR, ROLES.ADMIN),
);

router.get(
  "/courses/:courseId/lessons",
  validators.courseIdParam,
  controller.list,
);
router.post(
  "/courses/:courseId/lessons",
  validators.lessonCreate,
  controller.create,
);
router.get("/lesson/:id", validators.idParam, controller.getById);
router.put("/lessons/:id", validators.lessonUpdate, controller.update);
router.delete("/lessons/:id", validators.idParam, controller.remove);

module.exports = router;
