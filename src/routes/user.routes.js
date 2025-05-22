const express = require("express");
const uploadImage = require("../middleware/upload");
const { verifyToken, authorizeRole } = require("../middleware/authJwt");
const {
	scheduleAppointment,
	getAllAppointment,
	updateUserInfo,
	getProfile,
	updateUserAvatar,
	getAllExamination,
} = require("../controllers/user.controller");

const router = express.Router();
const uploadUserAvatar = uploadImage("user/avatar");

router.post("/schedule-appointment", verifyToken, scheduleAppointment);

router.post("/appointments", verifyToken, getAllAppointment);

router.post("/medical-history", verifyToken, getAllExamination);

router.put("/profile", verifyToken, getProfile);

router.put("/upload-profile", verifyToken, updateUserInfo);

router.put("/upload-avatar", verifyToken, uploadUserAvatar.single("avatar"), updateUserAvatar);

router.get("/test", (req, res) => {
	console.log("✅ Test API called!");
	res.send("API hoạt động!");
});

module.exports = router;
