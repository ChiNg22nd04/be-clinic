const { sequelize } = require("../database/sequelize");
const cloudinary = require("../config/cloudinaryConfig");
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

const getProfile = async (req, res) => {
	try {
		const { id } = req.body;
		console.log(id);
		// Kiểm tra xem có file không
		const [profile] = await sequelize.query(`SELECT * FROM [User] WHERE id = :id`, {
			replacements: { id },
			type: sequelize.QueryTypes.SELECT,
		});
		console.log(profile);
		res.status(200).json({
			message: "Fetch profile user successfully.",
			data: profile,
		});
	} catch (err) {
		console.error("Error fetching profile user:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const updateUserInfo = async (req, res) => {
	try {
		const userId = req.user.id;
		const { email, full_name, role, username } = req.body;

		// Lấy user hiện tại
		const [user] = await sequelize.query(`SELECT * FROM [Users] WHERE id = :userId`, {
			replacements: { userId },
			type: sequelize.QueryTypes.SELECT,
		});

		if (!user) return res.status(404).json({ message: "User not found." });

		// Cập nhật
		await sequelize.query(
			`UPDATE [Users]
			 SET email = :email,
			     full_name = :full_name,
			     role = :role,
			     username = :username
			 WHERE id = :userId`,
			{
				replacements: {
					email: email || user.email,
					full_name: full_name || user.full_name,
					role: role !== undefined ? role : user.role,
					username: username || user.username,
					userId,
				},
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		const [updatedUser] = await sequelize.query(`SELECT * FROM [Users] WHERE id = :userId`, {
			replacements: { userId },
			type: sequelize.QueryTypes.SELECT,
		});

		res.status(200).json({ message: "User info updated", user: updatedUser });
	} catch (err) {
		console.error("Error updating user info:", err);
		res.status(500).json({ message: "Server error." });
	}
};

const updateUserAvatar = async (req, res) => {
	try {
		const userId = req.user.id;

		let imageUrl = req.body.image;

		if (req.file) {
			const result = await cloudinary.uploader.upload(req.file.path, {
				folder: "user/avatar", // ✅ folder trong Cloudinary
				use_filename: true,
				unique_filename: false,
			});
			imageUrl = result.secure_url;
		}

		const { email, fullName, username, role } = req.body;

		await sequelize.query(
			`UPDATE [User] SET 
				image = :image,
				email = COALESCE(:email, email),
				full_name = COALESCE(:fullName, full_name),
				username = COALESCE(:username, username),
				role = COALESCE(:role, role)
			WHERE id = :userId`,
			{
				replacements: {
					image: imageUrl,
					email,
					fullName,
					username,
					role,
					userId,
				},
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		const [updatedUser] = await sequelize.query(`SELECT * FROM [User] WHERE id = :userId`, {
			replacements: { userId },
			type: sequelize.QueryTypes.SELECT,
		});

		res.status(200).json({
			message: "Avatar and profile updated successfully",
			data: updatedUser,
			imageUrl,
		});
	} catch (err) {
		console.error("Error updating avatar and profile:", err);
		res.status(500).json({ message: "Server error." });
	}
};

const getAllExamination = async (req, res) => {
	try {
		const { patientId } = req.body;
		console.log(req.body);

		const data = await sequelize.query(
			`SELECT 
				ex.staff_id, 
				u1.full_name as staff_name,
				ex.id,
				ex.id_appointment,
				ex.examination_date,
				ex.diagnosis,
				ex.status,
				u.id AS patient_id,
				u.full_name AS full_name,
				a.clinic_id,
				a.specialty_id,
				c.clinic_name,
				s.specialty_name
			FROM [ExaminationForm] ex
			JOIN [User] u1 ON u1.id = ex.staff_id
			JOIN [MedicalRecords] m ON m.id = ex.medical_record_id
			JOIN [User] u ON u.id = m.patient_id
			JOIN [Appointments] a ON a.id = ex.id_appointment
			JOIN [Clinics] c ON c.clinic_id = a.clinic_id
			JOIN [Specialty] s ON s.specialty_id = a.specialty_id
			WHERE u.id = :patient_id AND ex.status != 0
			ORDER BY ex.examination_date DESC`,
			{
				replacements: { patient_id: patientId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(data);

		res.status(201).json({
			message: "Get All Examination successful",
			data,
		});
	} catch (err) {
		res.status(500).json({ message: "Server error." });
	}
};

const getMedicalRecord = async (req, res) => {
	try {
		const { patientId } = req.body;
		console.log(req.body);
	} catch (err) {
		console.error("Error in getting medical record:", err);
	}
};

module.exports = {
	scheduleAppointment,
	getAllAppointment,
	getProfile,
	updateUserAvatar,
	updateUserInfo,
	getAllExamination,
	getMedicalRecord,
};
