const express = require("express");

const router = express.Router();
const authRoutes = require("./auth.routes");
const receptionistRoutes = require("./receptionist.routes");
const doctorRoutes = require("./doctor.routes");
const userRoutes = require("./user.routes");

router.use("/", authRoutes);
router.use("/user", userRoutes);
router.use("/receptionist", receptionistRoutes);
router.use("/doctor", doctorRoutes);

console.log("✅ Routes initialized");
module.exports = router;
