const { sequelize } = require("../database/sequelize");
const cloudinary = require("../config/cloudinaryConfig");

const getAllExaminationForm = async (req, res) => {
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

// const updateExaminationForm = async (req, res) => {
// 	try {
// 		let imageUrl = null;

// 		if (req.file) {
// 			const result = await cloudinary.uploader.upload(req.file.path, {
// 				folder: "examination_forms_record",
// 				use_filename: true,
// 				unique_filename: false,
// 			});
// 			imageUrl = result.secure_url;
// 			console.log("imageUrl", imageUrl);
// 		} else if (req.body.image) {
// 			imageUrl = req.body.image;
// 		}

// 		const { id, diagnosis, note, status } = req.body;

// 		if (!id || !diagnosis || !status) {
// 			return res.status(400).json({ message: "Missing required fields." });
// 		}

// 		const [update] = await sequelize.query(
// 			`UPDATE [ExaminationForm]
// 			SET diagnosis = :diagnosis, note = :note, status = :status, image = :image
// 			WHERE id = :id`,
// 			{
// 				replacements: {
// 					id,
// 					diagnosis,
// 					note,
// 					status,
// 					image: imageUrl,
// 				},
// 				type: sequelize.QueryTypes.UPDATE,
// 			}
// 		);
// 		console.log("update", update);

// 		const [data] = await sequelize.query(`SELECT * FROM [ExaminationForm] WHERE id = :id`, {
// 			replacements: { id },
// 			type: sequelize.QueryTypes.SELECT,
// 		});

// 		console.log("data", data);

// 		res.status(200).json({
// 			message: "ExaminationForm updated successfully",
// 			data,
// 		});
// 	} catch (err) {
// 		console.error("Error updating examinationForm:", err);
// 		res.status(500).json({ message: "Server error, please try again later." });
// 	}
// };

const updateExaminationForm = async (req, res) => {
	try {
		let imageUrls = [];

		if (req.files && req.files.length > 0) {
			for (const file of req.files) {
				const result = await cloudinary.uploader.upload(file.path, {
					folder: "user/record",
					use_filename: true,
					unique_filename: false,
				});
				imageUrls.push(result.secure_url);
				console.log("result", result);
			}
		} else if (req.body.image) {
			imageUrls = Array.isArray(req.body.image) ? req.body.image : [req.body.image];
		}

		const { id, diagnosis, note, status } = req.body;

		if (!id || !diagnosis || !status) {
			return res.status(400).json({ message: "Missing required fields." });
		}

		const [update] = await sequelize.query(
			`UPDATE [ExaminationForm] 
			SET diagnosis = :diagnosis, note = :note, status = :status, image = :image 
			WHERE id = :id`,
			{
				replacements: {
					id,
					diagnosis,
					note,
					status,
					image: JSON.stringify(imageUrls), // lưu chuỗi JSON
				},
				type: sequelize.QueryTypes.UPDATE,
			}
		);
		console.log("update", update);

		const [data] = await sequelize.query(`SELECT * FROM [ExaminationForm] WHERE id = :id`, {
			replacements: { id },
			type: sequelize.QueryTypes.SELECT,
		});

		// parse lại image từ chuỗi JSON
		data.image = data.image ? JSON.parse(data.image) : [];
		console.log("data", data);
		res.status(200).json({
			message: "ExaminationForm updated successfully",
			data,
		});
	} catch (err) {
		console.error("Error updating examinationForm:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const updatePrescription = async (req, res) => {
	try {
		const { id, medicineId, quantity, usage } = req.body;
		console.log("id", id);
		const [detail] = await sequelize.query(
			`INSERT INTO [Prescription] (examination_form_id, medicine_id, quantity, usage)
				VALUES (:examinationFormId, :medicineId, :quantity, :usage);`,
			{
				replacements: {
					examinationFormId: id,
					medicineId,
					quantity,
					usage,
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);
		console.log(detail);
		res.status(200).json({
			message: "Update prescriptions successfully",
			data: detail,
		});
	} catch (err) {
		console.error("Error in making update prescription:", err);
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

const getMedicine = async (req, res) => {
	try {
		const data = await sequelize.query(
			`SELECT id, name, description, price
			FROM Medicine`,
			{
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
	getAllExaminationForm,
	getExaminationForm,
	updateExaminationForm,
	updatePrescription,
	getPrescription,
	getMedicine,
};
