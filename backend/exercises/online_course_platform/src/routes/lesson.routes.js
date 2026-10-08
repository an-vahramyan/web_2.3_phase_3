const express = require("express");
const controller = require("../controllers/lesson.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const validators = require("../middlewares/validate.middleware");

const router = express.Router();

router.get(
  "/courses/:courseId/lessons",
  authenticate,
  validators.courseIdParam,
  controller.list,
);
router.post(
  "/courses/:courseId/lessons",
  authenticate,
  validators.lessonCreate,
  controller.create,
);
router.get("/lessons/:id", authenticate, validators.idParam, controller.getById);
router.put("/lessons/:id", authenticate, validators.lessonUpdate, controller.update);
router.delete("/lessons/:id", authenticate, validators.idParam, controller.remove);

module.exports = router;
