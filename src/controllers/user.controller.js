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
		const {
			patientId,
			staffId,
			appointmentDate,
			symptoms,
			clinicId,
			specialtyId,
			staffShiftsId,
		} = req.body;
		console.log(req.body);
		if (!staffId || !appointmentDate)
			return res.status(400).json({ message: "Please fill in the required fields" });

		// Kiểm tra định dạng ngày
		const formattedDateString = moment(appointmentDate, "YYYY-MM-DD HH:mm:ss", true);
		if (!formattedDateString.isValid()) {
			return res.status(400).json({ message: "Invalid appointment date." });
		}
		const formattedDate = formattedDateString.format("YYYY-MM-DD HH:mm:ss");

		// const patientId = req.user.id;
		// console.log("patientId", patientId);
		await createPatientProfile(patientId);

		const [doctor] = await sequelize.query(
			`SELECT * FROM [ProfileStaff] WHERE staff_id = :staff_id`,
			{
				replacements: { staff_id: staffId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(doctor);
		if (!doctor) return res.status(404).json({ message: "Doctor not found." });

		await sequelize.query(
			`INSERT INTO [Appointments] (patient_id, staff_id, symptoms, appointment_date, status, clinic_id, specialty_id, staff_shifts_id)
		VALUES (:patient_id, :staffId, :symptoms, :appointmentDate, :status, :clinic_id, :specialty_id, :staff_shifts_id);`,
			{
				replacements: {
					patient_id: patientId,
					staffId: doctor.staff_id,
					symptoms: symptoms || null,
					appointmentDate: formattedDate,
					status: 0,
					clinic_id: clinicId,
					specialty_id: specialtyId,
					staff_shifts_id: staffShiftsId,
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);

		res.status(201).json({
			message: "Appointment successful",
			appointment: {
				patientId,
				staffId: doctor.staff_id,
				symptoms,
				appointmentDate: formattedDate,
				status: 0,
				clinicId,
				specialtyId,
				staffShiftsId,
			},
		});
	} catch (err) {
		console.error("Error in making appointment:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const getAllAppointment = async (req, res) => {
	try {
		const { patientId } = req.body;
		console.log(req.body);

		const data = await sequelize.query(
			`SELECT 
			a.id,
			a.patient_id,
			a.staff_id,
			u.full_name AS staff_name,
			a.specialty_id,
			s.specialty_name,
			a.symptoms,
			a.appointment_date,
			a.clinic_id,
			c.clinic_name,
			a.status
		FROM [Appointments] a
		JOIN [User] u ON a.staff_id = u.id
		JOIN [Specialty] s ON a.specialty_id = s.specialty_id
		JOIN [Clinics] c ON a.clinic_id = c.clinic_id
		WHERE a.patient_id = patient_id
		ORDER BY a.appointment_date DESC;`,
			{
				replacements: { patient_id: patientId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(data);

		res.status(201).json({
			message: "Get All Appointment successful",
			data,
		});
	} catch (err) {
		console.error("Error in making appointment:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = { scheduleAppointment, getAllAppointment };
