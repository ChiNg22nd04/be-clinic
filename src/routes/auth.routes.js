const express = require("express");
const AuthController = require("../controllers/auth.controller");
const { validateUser } = require("../middleware/validateUser");

const router = express.Router();

router.post("/register", validateUser("register"), AuthController.register);
router.post("/login", validateUser("login"), AuthController.login);
router.post("/resend-otp", AuthController.resendOPT);
router.post("/forget-password", AuthController.forgetPassword);

module.exports = router;
