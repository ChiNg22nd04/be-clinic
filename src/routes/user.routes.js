const express = require("express");
const { authorizeRole } = require("../middleware/authorizeRole");
const authJwt = require("../middleware/authJwt");
const UserController = require("../controllers/user.controller");

const router = express.Router();
// router.post("/schedule-appointment", authorizeRole, UserController.scheduleAppointment);
router.post(
	"/schedule-appointment",
	(req, res, next) => {
		console.log("✅ API /user/schedule-appointment is called");
		next();
	},
	authJwt.verifyToken,
	authorizeRole(2),
	UserController.scheduleAppointment
);
module.exports = router;
