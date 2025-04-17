const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const {
	getAppointment,
	updateStatusAppointment,
	getAllExamination,
} = require("../controllers/receptionist.controller");

const router = express.Router();
// API đặt lịch khám bệnh
router.get("/appointment/get-all", verifyToken, authorizeRole(2), getAppointment);
router.put("/appointment/update-status", verifyToken, authorizeRole(2), updateStatusAppointment);
router.put("/examination/get-all", verifyToken, authorizeRole(2), getAllExamination);

router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
