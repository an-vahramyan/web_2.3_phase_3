const express = require("express");
const controller = require("../controllers/enrollment.controller");
const { authenticate, authorize } = require("../middlewares/auth.middleware");
const { ROLES } = require("../constants/roles");
const validators = require("../middlewares/validate.middleware");
const router = express.Router();
router.post(
  "/",
  authenticate,
  authorize(ROLES.STUDENT),
  validators.enrollmentCreate,
  controller.create,
);
router.get("/me", authenticate, authorize(ROLES.STUDENT), controller.my);
router.get("/", authenticate, authorize(ROLES.ADMIN), controller.listAll);
router.patch(
  "/:id/progress",
  authenticate,
  authorize(ROLES.STUDENT),
  validators.progress,
  controller.progress,
);
router.delete(
  "/:id",
  authenticate,
  authorize(ROLES.STUDENT, ROLES.ADMIN),
  validators.idParam,
  controller.cancel,
);

module.exports = router;
