const { sequelize } = require("../database/sequelize");
const Appointments = require("../models/appointments.model");
const { DATE, DataTypes } = require("sequelize");
const moment = require("moment");

const getAppointment = async (req, res) => {
	try {
		const appointment = await sequelize.query(`SELECT * FROM [Appointments]`, {
			type: sequelize.QueryTypes.SELECT,
		});
		console.log(appointment);

		res.status(201).json({
			message: "Appointments fetched successfully",
			data: appointment,
		});
	} catch (err) {
		console.error("Error in making appointment:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = { getAppointment };
