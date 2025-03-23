const bcrypt = require("bcrypt");
const express = require("express");
const User = require("../models/users.model");

const scheduleAppointment = async (req, res, next) => {
	try {
		const { patientId, doctorId, symptoms, appointmentDate } = req.body;
		console.log(req.body);
		return req.body;
	} catch {
		return console.log("Rơi vào catch");
	}
};

module.exports = {
	scheduleAppointment,
};
