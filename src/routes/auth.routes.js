const express = require("express");
const AuthController = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/verify-otp", AuthController.verifyOTP);
router.post("/resend-otp", AuthController.resendOPT);
router.post("/forget-password", AuthController.forgetPassword);

module.exports = router;
