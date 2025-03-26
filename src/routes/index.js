const express = require("express");

const router = express.Router();
const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

router.use("/", authRoutes);
router.use("/user", userRoutes);
console.log("✅ Routes initialized");
module.exports = router;
