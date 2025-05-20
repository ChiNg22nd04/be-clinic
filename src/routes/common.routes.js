const express = require("express");
const CommonController = require("../controllers/common.controller");

const router = express.Router();

router.get("/specialties", CommonController.getAllSpecialties);

router.get("/specialties", CommonController.getAllSpecialties);

router.get("/clinics", CommonController.getAllClinics);

router.post("/specialties/clinic-id", CommonController.getSpecialtiesByIDClinic);

router.post("/specialties/doctor-all", CommonController.getAllSpecialtiesDoctor);

router.post("/shifts-all", CommonController.getAllShiftDoctor);

router.post("/shifts/doctor-id", CommonController.getShiftByIDDoctor);

router.get("/articles", CommonController.getAllArticles);

router.get("/achievements", CommonController.getAllAchievements);


router.get("/professional", CommonController.getAllDoctor);

router.post("/professional/doctor-id", CommonController.getDoctorByID);

module.exports = router;
