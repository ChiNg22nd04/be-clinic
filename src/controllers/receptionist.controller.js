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
		const data = await sequelize.query(
			`SELECT 
				a.id,
				a.patient_id,
				p.full_name AS patient_name,  
				a.staff_id,
				s.full_name AS staff_name,   
				a.specialty_id,
				sp.specialty_name,
				a.symptoms,
				a.appointment_date,
				a.clinic_id,
				c.clinic_name,
				a.status
			FROM [Appointments] a
			JOIN [User] s ON a.staff_id = s.id          
			JOIN [User] p ON a.patient_id = p.id        
			JOIN [Specialty] sp ON a.specialty_id = sp.specialty_id
			JOIN [Clinics] c ON a.clinic_id = c.clinic_id
			ORDER BY a.appointment_date DESC;`,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);
		res.status(201).json({
			message: "Appointments fetched successfully",
			data: data,
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

		const [data] = await sequelize.query(
			`SELECT 
				a.id,
				a.patient_id,
				p.full_name AS patient_name,  
				a.staff_id,
				s.full_name AS staff_name,   
				a.specialty_id,
				sp.specialty_name,
				a.symptoms,
				a.appointment_date,
				a.clinic_id,
				c.clinic_name,
				a.status
			FROM [Appointments] a
			JOIN [User] s ON a.staff_id = s.id          
			JOIN [User] p ON a.patient_id = p.id        
			JOIN [Specialty] sp ON a.specialty_id = sp.specialty_id
			JOIN [Clinics] c ON a.clinic_id = c.clinic_id
			WHERE a.id = :id
			ORDER BY a.appointment_date DESC;`,
			{ replacements: { id }, type: sequelize.QueryTypes.SELECT }
		);

		res.status(200).json({
			message: "Appointment status updated successfully.",
			data: data,
		});
	} catch (err) {
		console.error("Error updating appointment status:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = { getAppointment, updateStatusAppointment };
