const { sequelize } = require("../database/sequelize");
const bcrypt = require("bcrypt");

const getAllStaff = async (req, res) => {
	try {
		const staff = await sequelize.query(`SELECT * FROM [User] WHERE role IN (:roles)`, {
			type: sequelize.QueryTypes.SELECT,
			replacements: { roles: [1, 2] },
		});

		if (!staff.length) {
			return res.status(404).json({
				message: "No staff found",
				data: [],
			});
		}

		res.status(200).json({
			message: "Staff fetched successfully",
			data: staff,
		});
	} catch (err) {
		console.error("Error fetching staff:", err.message);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const getAllPatient = async (req, res) => {
	try {
		const data = await sequelize.query(`SELECT * FROM [User] WHERE role IN (:roles)`, {
			type: sequelize.QueryTypes.SELECT,
			replacements: { roles: [3] },
		});

		if (!data.length) {
			return res.status(404).json({
				message: "No patient found",
				data: [],
			});
		}

		res.status(200).json({
			message: "Patient fetched successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error fetching patient:", err.message);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

const createStaff = async (req, res) => {
	try {
		const {
			email,
			password,
			full_name,
			phone,
			role,
			username,
			specialtyId,
			department,
			yearsOfExperience,
			education,
		} = req.body;
		console.log(req.body);

		const [isSpecialtyId] = await sequelize.query(
			`SELECT * FROM [Specialty] WHERE specialtyId = :specialtyId`,
			{
				replacements: {
					specialtyId,
				},
				type: sequelize.QueryTypes.SELECT,
			}
		);
		console.log(isSpecialtyId);

		const hashPassword = await bcrypt.hash(password, 10);

		await sequelize.query(
			`INSERT INTO [User] (email, password, full_name, username, phone, role, is_verified) 
             VALUES (:email, :password, :full_name, :username, :phone, :role, :is_verified);`,
			{
				replacements: {
					email,
					password: hashPassword,
					full_name: full_name || null,
					username: username || null,
					phone: phone || null,
					role: Number(role),
					is_verified: Number(1),
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);

		const [data] = await sequelize.query(`SELECT * FROM [User] WHERE email = :email`, {
			replacements: { email: email },
			type: sequelize.QueryTypes.SELECT,
		});

		await sequelize.query(
			`INSERT INTO [ProfileStaff] (staff_id,specialtyId,department,years_of_experience,education) 
             VALUES (:staffId,:specialtyId,:department,:yearsOfExperience,:education);`,
			{
				replacements: {
					staffId: data.id,
					specialtyId: isSpecialtyId,
					department,
					yearsOfExperience,
					education,
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);

		const roleData = data.role;
		console.log(roleData);

		res.status(201).json({
			message: "Staff created successfully",
			data: data,
		});
	} catch (err) {
		console.error("Error creating staff:", err.message);
		res.status(500).json({ message: "Server error, please try again later." });
	}
};

module.exports = { getAllStaff, getAllPatient, createStaff };
