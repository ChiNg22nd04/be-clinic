const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const {
	getExaminationForm,
	getAllExaminationForm,
	updateExaminationForm,
	updatePrescription,
	getPrescription,
	getMedicine,
} = require("../controllers/doctor.controller");

const router = express.Router();
// API đặt lịch khám bệnh
router.get("/medical-examination/get-all", verifyToken, authorizeRole(1), getAllExaminationForm);
router.get("/medical-examination/get-detail", verifyToken, authorizeRole(1), getExaminationForm);
router.put("/medical-examination/update", verifyToken, authorizeRole(1), updateExaminationForm);

router.post("/prescription/update-form", verifyToken, authorizeRole(1), updatePrescription);
router.post("/prescription/form", verifyToken, authorizeRole(1), getPrescription);
router.get("/medicine/get-all", verifyToken, authorizeRole(1), getMedicine);

router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
