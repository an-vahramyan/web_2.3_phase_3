const express = require("express");
const controller = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { register, login } = require("../middlewares/validate.middleware");

const router = express.Router();

router.post("/register", register, controller.register);
router.post("/login",login, controller.login);
router.get('/me',authenticate, controller.me);

module.exports = router;
