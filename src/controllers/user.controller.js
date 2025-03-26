const { sequelize } = require("../database/sequelize");
const Appointments = require("../models/appointments.model");
const { DATE, DataTypes } = require("sequelize");
const moment = require("moment");

const scheduleAppointment = async (req, res) => {
	try {
		const { doctorId, symptoms, appointmentDate } = req.body;
		const patientId = req.user.id;

		if (!doctorId || !appointmentDate) {
			return res.status(400).json({ message: "doctorId và appointmentDate là bắt buộc" });
		}

		const [doctor] = await sequelize.query(
			`SELECT * FROM [DoctorProfile] WHERE doctor_id = :doctorId`,
			{
				replacements: { doctorId },
				type: sequelize.QueryTypes.SELECT,
			}
		);

		if (!doctor) return res.status(404).json({ message: "Doctor not found." });
		const formattedDate = moment(appointmentDate).format("YYYY-MM-DD HH:mm:ss");

		// Chuyển đổi appointmentDate thành kiểu Date
		// const formattedDate = new Date(appointmentDate);
		if (isNaN(formattedDate)) {
			return res.status(400).json({ message: "Ngày hẹn không hợp lệ" });
		}

		// Thêm lịch hẹn vào database
		await sequelize.query(
			`INSERT INTO [Appointments] (patient_id, doctor_id, symptoms, appointment_date, status)
			VALUES (:patientId, :doctorId, :symptoms, :appointmentDate, :status);`,
			{
				replacements: {
					patientId,
					doctorId: doctor.doctor_id,
					symptoms: symptoms || null,
					appointmentDate: formattedDate, // Đảm bảo là kiểu Date
					status: 0,
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);

		res.status(201).json({
			message: "Đặt lịch thành công",
			appointment: {
				patientId,
				doctorId: doctor.doctor_id,
				symptoms,
				appointmentDate: formattedDate,
				status: 0,
			},
		});
	} catch (error) {
		console.error("Lỗi khi đặt lịch khám:", error);
		res.status(500).json({ message: "Lỗi máy chủ, vui lòng thử lại sau" });
	}
};

module.exports = { scheduleAppointment };
