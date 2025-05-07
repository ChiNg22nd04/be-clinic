const { sequelize } = require("../database/sequelize");

// lấy all chuyên khoa
const getAllSpecialties = async (req, res) => {
	try {
		const specialties = await sequelize.query(`SELECT * FROM [Specialty]`);
		console.log(specialties);
		res.status(200).json({ success: true, data: specialties });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// lấy all clinics
const getAllClinics = async (req, res) => {
	try {
		const clinics = await sequelize.query(`SELECT * FROM [Clinics]`);
		console.log(clinics);
		res.status(200).json({ success: true, data: clinics });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// lấy all chuyên khoe theo clinics
const getSpecialtiesByIDClinic = async (req, res) => {
	const { clinicId } = req.body;
	try {
		const clinicSpecialty = await sequelize.query(
			`SELECT * FROM [ClinicSpecialty] WHERE clinic_id = :clinic_id`,
			{
				replacements: { clinic_id: clinicId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(clinicSpecialty);
		res.status(200).json({ success: true, data: clinicSpecialty });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// lấy all bsi theo specialty + clinics
const getAllSpecialtiesDoctor = async (req, res) => {
	try {
		const { specialtyId, clinicId } = req.body;
		const docList = await sequelize.query(
			`SELECT 
				ps.staff_id, 
				u.full_name, 
				ps.specialty_id, 
				ps.clinic_id, 
				ps.department, 
				ps.years_of_experience, 
				ps.education
			FROM [ProfileStaff] ps
			JOIN [User] u ON u.id = ps.staff_id
			WHERE specialty_id = :specialty_id AND clinic_id = :clinic_id`,
			{
				replacements: { specialty_id: specialtyId, clinic_id: clinicId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(docList);
		res.status(200).json({ success: true, data: docList });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

// lấy ca làm theo id bác sĩ
const getShiftByIDDoctor = async (req, res) => {
	try {
		const { staffId } = req.body;

		const shiftList = await sequelize.query(
			`SELECT * FROM [StaffShifts] WHERE staff_id = :staff_id`,
			{
				replacements: { staff_id: staffId },
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(shiftList);
		res.status(200).json({ success: true, data: shiftList });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

const getAllShiftDoctor = async (req, res) => {
	try {
		const { staffId, specialtyId, clinicId } = req.body;
		const shifts = await sequelize.query(
			`SELECT 
				ps.staff_id,
				ps.clinic_id,
				ps.specialty_id,
				ss.shift_id,
				ss.work_date,
				s.shift_name,
				s.start_time,
				ss.status,
				ss.id
			FROM [StaffShifts] ss
			JOIN [ProfileStaff] ps ON ss.staff_id = ps.staff_id
			JOIN [Shifts] s ON ss.shift_id = s.id
			WHERE ps.staff_id = :staff_id AND ps.specialty_id = :specialty_id AND ps.clinic_id = :clinic_id
			`,
			{
				replacements: {
					staff_id: staffId,
					specialty_id: specialtyId,
					clinic_id: clinicId,
				},
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(shifts);
		res.status(200).json({ success: true, data: shifts });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server error" });
	}
};

const getAllArticles = async (req, res) => {
	try {
		const data = await sequelize.query(
						`
			SELECT 
				a.article_id,
				a.title,
				a.content,
				a.author,
				a.published_date,
				a.category,
				f.id AS file_id,
				f.filename_download,
				f.title AS file_title,
				f.type AS file_type,
				f.filesize,
				f.width,
				f.height
			FROM Articles a
			LEFT JOIN articles_files ar ON a.article_id = ar.id
			LEFT JOIN directus_files f ON ar.directus_files_id = f.id`,
			{
				type: sequelize.QueryTypes.SELECT,
			}
		);
		res.status(200).json({ success: true, data });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: "Server error" });
	}
};

module.exports = {
	getAllSpecialties,
	getAllClinics,
	getSpecialtiesByIDClinic,
	getAllSpecialtiesDoctor,
	getAllShiftDoctor,
	getShiftByIDDoctor,
	getAllArticles,
};
