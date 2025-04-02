const { sequelize } = require("../database/sequelize");
const Appointments = require("../models/appointments.model");
const { DATE, DataTypes } = require("sequelize");
const moment = require("moment");

const getListExaminationForm = async (req, res) => {
	try {
		// Lấy ngày hiện tại theo định dạng YYYY-MM-DD
		const currentDate = moment().format("YYYY-MM-DD");
		const examinationForm = await sequelize.query(
			`SELECT * FROM [ExaminationForm] WHERE CAST(examination_date AS DATE) = :examination_date`,
			{
				replacements: { examination_date: currentDate },
				type: sequelize.QueryTypes.SELECT,
			}
		);

		console.log(examinationForm);
		res.status(200).json({
			message: "ExaminationForm fetched successfully",
			data: examinationForm,
		});
	} catch (err) {
		console.error("Error in making examinationForm:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const getExaminationForm = async (req, res) => {
	try {
		const { id } = req.body;
		console.log(id);
		const [detail] = await sequelize.query(`SELECT * FROM [ExaminationForm] WHERE id = :id`, {
			replacements: { id },
			type: sequelize.QueryTypes.SELECT,
		});

		console.log(detail);
		res.status(200).json({
			message: "Detail examinationForm fetched successfully",
			data: detail,
		});
	} catch (err) {
		console.error("Error in making detail examinationForm:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const updateExaminationForm = async (req, res) => {
	try {
		const { id, diagnosis, note, status } = req.body;
		console.log(req.body);
		await sequelize.query(
			`UPDATE [ExaminationForm] SET diagnosis= :diagnosis, note = :note, 
			status = :status WHERE id = :id`,
			{
				replacements: {
					id: id,
					diagnosis,
					note,
					status: status,
				},
				type: sequelize.QueryTypes.UPDATE,
			}
		);
		const [data] = await sequelize.query(`SELECT * FROM [ExaminationForm] WHERE id = :id`, {
			replacements: { id: id },
			type: sequelize.QueryTypes.SELECT,
		});
		console.log("data", data);
		res.status(200).json({
			message: "Detail examinationForm fetched successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error in making update examinationForm:", err);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = { getListExaminationForm, getExaminationForm, updateExaminationForm };
