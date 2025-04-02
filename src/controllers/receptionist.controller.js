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
const updateStatusAppointment = async (req, res) => {
	try {
		const { id, status } = req.body;
		const statusID = Number(status); // Chuyển status thành số
		console.log(statusID);

		// Kiểm tra status hợp lệ
		if (![0, 1, 2].includes(statusID)) {
			return res.status(400).json({ message: "Invalid status value." });
		}

		// Lấy thông tin Appointment theo id
		const [appointment] = await sequelize.query(`SELECT * FROM [Appointments] WHERE id = :id`, {
			replacements: { id },
			type: sequelize.QueryTypes.SELECT,
		});

		// Kiểm tra nếu không tìm thấy appointment
		if (!appointment) {
			return res.status(404).json({ message: "Appointment not found." });
		}

		// Cập nhật status appointment
		await sequelize.query(
			`UPDATE [Appointments] SET status = :status WHERE id = :id`, // Cập nhật cả status và id
			{
				replacements: { status: statusID, id }, // Cần thay thế cả status và id
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		const [updatedAppointment] = await sequelize.query(
			`SELECT * FROM [Appointments] WHERE id = :id`,
			{
				replacements: { id },
				type: sequelize.QueryTypes.SELECT,
			}
		);

		res.status(200).json({
			message: "Appointment status updated successfully.",
			data: updatedAppointment,
		});
	} catch (err) {
		console.error("Error updating appointment status:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = { getAppointment, updateStatusAppointment };
