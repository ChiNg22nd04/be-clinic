const express = require("express");
const { Op } = require("sequelize");
const Appointments = require("../models/appointments.model");
const DoctorProfile = require("../models/doctorProfile.model");
const scheduleAppointment = async (req, res) => {
	try {
		console.log("API scheduleAppointment is called");
		const { doctorId, symptoms, appointmentDate } = req.body;
		const patientId = req.user.id; // Lấy từ token

		console.log("Request Data:", { patientId, doctorId, symptoms, appointmentDate });

		const doctor = await DoctorProfile.findByPk(doctorId);
		if (!doctor) {
			console.log("Doctor not found");
			return res.status(404).json({ message: "Doctor not found" });
		}

		const newAppointment = await Appointments.create({
			patientId,
			doctorId,
			symptoms,
			appointmentDate,
			status: 0,
		});

		console.log("Appointment Created:", newAppointment);
		return res.status(201).json({
			message: "Appointment scheduled successfully",
			appointment: newAppointment,
		});
	} catch (error) {
		console.error("Error scheduling appointment:", error);
		return res.status(500).json({ message: "Internal server error", error: error.message });
	}
};

module.exports = {
	scheduleAppointment,
};
