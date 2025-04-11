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
			`SELECT * FROM [ProfileStaff] WHERE specialty_id = :specialty_id AND clinic_id = :clinic_id`,
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
				s.shift_name
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

module.exports = {
	getAllSpecialties,
	getAllClinics,
	getSpecialtiesByIDClinic,
	getAllSpecialtiesDoctor,
	getAllShiftDoctor,
	getShiftByIDDoctor,
};
