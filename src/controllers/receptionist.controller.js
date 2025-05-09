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

const getAllExamination = async (req, res) => {
	try {
		const data = await sequelize.query(
			`SELECT 
				e.id,
				e.numerical,
				e.medical_record_id,
				e.id_appointment,
				e.staff_id,
				e.diagnosis,
				e.note,
				e.status,
				m.patient_id,
				p.full_name AS patient_name,  
				e.staff_id,
				s.full_name AS staff_name,   
				a.specialty_id,
				sp.specialty_name,
				a.symptoms,
				a.appointment_date,
				e.examination_date,
				a.clinic_id,
				c.clinic_name,
				c.address,
				c.phone_number,
				c.email_address,
				e.status,
				e.image
			FROM [ExaminationForm] e
			JOIN [User] s ON e.staff_id = s.id          
			JOIN [MedicalRecords] m ON e.medical_record_id = m.id       
			JOIN [User] p ON p.id = m.patient_id       
			JOIN [Appointments] a ON a.id = e.id_appointment       
			JOIN [Specialty] sp ON a.specialty_id = sp.specialty_id
			JOIN [Clinics] c ON a.clinic_id = c.clinic_id
			ORDER BY a.appointment_date DESC;`,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(data);
		res.status(201).json({
			message: "Appointments fetched successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error in making appointment:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const createInvoice = async (req, res) => {
	try {
		const { examinationFormId } = req.body;
		const data = await sequelize.query(
			`INSERT INTO [Invoice] (examination_form_id)
			VALUES (:examinationFormId)
			`,
			{
				replacements: { examinationFormId },
				type: sequelize.QueryTypes.INSERT,
			}
		);
		await sequelize.query(
			`UPDATE ExaminationForm
			SET status = 2
			WHERE id = :examinationFormId;`,
			{
				replacements: { examinationFormId },
				type: sequelize.QueryTypes.UPDATE,
			}
		);
		console.log(data);
		const [total] = await sequelize.query(
			`UPDATE Invoice
			SET total_amount = (
				SELECT SUM(m.price * p.quantity)
				FROM Prescription p
				JOIN Medicine m ON p.medicine_id = m.id
				WHERE p.examination_form_id = Invoice.examination_form_id
			)
			WHERE examination_form_id = :examinationFormId;`,
			{
				replacements: { examinationFormId },
				type: sequelize.QueryTypes.UPDATE,
			}
		);
		console.log(total);
		res.status(201).json({
			message: "Invoice fetched successfully",
			data: total,
		});
	} catch (err) {
		console.error("Error in making invoice:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const getAllInvoice = async (req, res) => {
	try {
		const data = await sequelize.query(
			`SELECT 
				i.id ,
				i.total_amount,
				i.payment_status,
				i.payment_method,
				i.created_at,

				ef.id AS examination_form_id,
				u.full_name AS patient_name,
				u.id AS patient_id
			FROM Invoice i
			JOIN ExaminationForm ef ON i.examination_form_id = ef.id
			JOIN MedicalRecords mr ON ef.medical_record_id = mr.id
			JOIN PatientProfile pp ON mr.patient_id = pp.patient_id
			JOIN [User] u ON pp.patient_id = u.id;`,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(data);

		res.status(201).json({
			message: "Invoice fetched successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error in making invoice:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const getShift = async (req, res) => {
	try {
		const { staffId } = req.body;
		console.log(staffId);
		const data = await sequelize.query(
			`SELECT 
				ss.id AS staff_shifts_id,
				s.shift_name,
				s.id AS shift_id,
				s.start_time,
				s.end_time,
				ss.work_date,
				ss.status
			FROM StaffShifts ss
			JOIN Shifts s ON ss.shift_id = s.id
			WHERE ss.staff_id = :staff_id
			ORDER BY ss.work_date, s.start_time;`,
			{
				replacements: { staff_id: staffId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(data);

		res.status(201).json({
			message: "Shifts staff fetched successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error in making shifts:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const getExaminationForm = async (req, res) => {
	try {
		const { id } = req.body;

		const [data] = await sequelize.query(
			`SELECT 
			e.id,
                e.numerical,
                e.medical_record_id,
                e.id_appointment,
                e.staff_id,
                e.diagnosis,
                e.note,
                e.status,
				m.patient_id,
				p.full_name AS patient_name,  
				e.staff_id,
				s.full_name AS staff_name,   
				a.specialty_id,
				sp.specialty_name,
				a.symptoms,
				a.appointment_date,
				e.examination_date,
				a.clinic_id,
				c.clinic_name,
                c.address,
                c.phone_number,
                c.email_address,
				e.status,
				e.image
			FROM [ExaminationForm] e
			JOIN [User] s ON e.staff_id = s.id          
			JOIN [MedicalRecords] m ON e.medical_record_id = m.id       
			JOIN [User] p ON p.id = m.patient_id       
			JOIN [Appointments] a ON a.id = e.id_appointment       
			JOIN [Specialty] sp ON a.specialty_id = sp.specialty_id
			JOIN [Clinics] c ON a.clinic_id = c.clinic_id
			WHERE e.id = :id`,
			{
				replacements: { id },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(data);
		res.status(201).json({
			message: "Appointments fetched successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error in making appointment:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const getPrescription = async (req, res) => {
	try {
		const { examinationFormId } = req.body;
		const id = parseInt(examinationFormId);
		const data = await sequelize.query(
			`SELECT 
			m.id AS medicine_id,
			m.name AS medicine_name,
			m.price,
			m.description,
			p.quantity,
			p.usage
		FROM 
			Prescription p
		JOIN 
			Medicine m ON p.medicine_id = m.id
		WHERE 
			p.examination_form_id = :examination_form_id;`,
			{
				replacements: { examination_form_id: examinationFormId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log("data", data);
		res.status(200).json({
			message: "Detail examinationForm successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error in making update examinationForm:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = {
	getAppointment,
	updateStatusAppointment,
	getAllExamination,
	createInvoice,
	getAllInvoice,
	getShift,
	getExaminationForm,
	getPrescription,
};
