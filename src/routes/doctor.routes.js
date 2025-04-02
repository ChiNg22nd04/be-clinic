const express = require("express");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const {
	getExaminationForm,
	getListExaminationForm,
	updateExaminationForm,
	updatePrescription,
} = require("../controllers/doctor.controller");

const router = express.Router();
// API đặt lịch khám bệnh
router.get("/medical-examination/get-all", verifyToken, authorizeRole(1), getListExaminationForm);
router.get("/medical-examination/get-detail", verifyToken, authorizeRole(1), getExaminationForm);
router.put(
	"/medical-examination/update-form",
	verifyToken,
	authorizeRole(1),
	updateExaminationForm
);

router.post("/prescription/update-form", verifyToken, authorizeRole(1), updatePrescription);
router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
