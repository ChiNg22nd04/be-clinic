const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const { scheduleAppointment, getAllAppointment } = require("../controllers/user.controller");

const router = express.Router();
// schedule-appointment
// API đặt lịch khám bệnh
router.post("/schedule-appointment", verifyToken, scheduleAppointment);
router.post("/appointment/get-all", verifyToken, getAllAppointment);

router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
