const { sequelize } = require("../database/sequelize");
const Appointments = require("../models/appointments.model");
const { DATE, DataTypes } = require("sequelize");
const moment = require("moment");

const createPatientProfile = async (patientId) => {
	try {
		const [paitent] = await sequelize.query(
			`SELECT * FROM [PatientProfile] WHERE patient_id = :patientId`,
			{
				replacements: { patientId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(paitent);
		if (!paitent) {
			await sequelize.query(
				`INSERT INTO [PatientProfile] (patient_id, date_of_birth, gender, address)
				VALUES (:patientId, :dateOfBirth, :gender, :address);`,
				{
					replacements: {
						patientId: patientId,
						dateOfBirth: null,
						gender: 2,
						address: null,
					},
					type: sequelize.QueryTypes.INSERT,
				}
			);
			console.log(`PatientProfile created for user ID: ${patientId}`);
		}
	} catch (err) {
		console.error("Error ensuring PatientProfile exists:", err);
		throw new Error("Error creating patient profile.");
	}
};

const scheduleAppointment = async (req, res) => {
	try {
		const { doctorId, appointmentDate, symptoms } = req.body;
		console.log(req.body);
		if (!doctorId || !appointmentDate)
			return res.status(400).json({ message: "Please fill in the required fields" });

		// Kiểm tra định dạng ngày
		const formattedDateString = moment(appointmentDate, "YYYY-MM-DD HH:mm:ss", true);
		if (!formattedDateString.isValid()) {
			return res.status(400).json({ message: "Invalid appointment date." });
		}
		const formattedDate = formattedDateString.format("YYYY-MM-DD HH:mm:ss");

		const patientId = req.user.id;
		console.log("patientId", patientId);
		await createPatientProfile(patientId);

		const [doctor] = await sequelize.query(
			`SELECT * FROM [DoctorProfile] WHERE doctor_id = :doctorId`,
			{
				replacements: { doctorId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(doctor);
		if (!doctor) return res.status(404).json({ message: "Doctor not found." });

		await sequelize.query(
			`INSERT INTO [Appointments] (patient_id, doctor_id, symptoms, appointment_date, status)
		VALUES (:patientId, :doctorId, :symptoms, :appointmentDate, :status);`,
			{
				replacements: {
					patientId: patientId,
					doctorId: doctor.doctor_id,
					symptoms: symptoms || null,
					appointmentDate: formattedDate,
					status: 0,
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);

		res.status(201).json({
			message: "Appointment successful",
			appointment: {
				patientId,
				doctorId: doctor.doctor_id,
				symptoms,
				appointmentDate: formattedDate,
				status: 0,
			},
		});
	} catch (err) {
		console.error("Error in making appointment:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = { scheduleAppointment };
