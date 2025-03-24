const bcrypt = require("bcrypt");
const User = require("../models/user.model");
const { sequelize } = require("../database/sequelize");

const register = async (req, res, next) => {
	try {
		const { email, password, fullName, username, phone, role } = req.body;
		console.log(req.body);
		if (!email || !password)
			return response
				.status(400)
				.json({ message: "Email and Password cannot be null", data: req.body });

		console.log(1);

		const result = await sequelize.query("SELECT TOP 1 * FROM [User] WHERE email = :email", {
			replacements: { email },
			type: sequelize.QueryTypes.SELECT,
		});

		const isEmail = result.length ? result[0] : null;

		console.log("isEmail", isEmail);

		console.log(2);

		if (isEmail) return res.status(400).json({ message: "Email is existed", data: req.body });

		console.log(3);
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);
		console.log(req.body.password);

		const newUser = await sequelize.query(
			"INSERT INTO [User] (email, password, full_name, username, phone, role) VALUES (:email, :password, :full_name, :username, :phone, :role);SELECT SCOPE_IDENTITY() AS id;",
			{
				replacements: {
					email,
					password: hashPassword,
					full_name: fullName || null,
					username: username || null,
					phone: phone || null,
					role: Number(role) || 2,
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);
		console.log(newUser);
		return res.status(201).json({ message: "Register success", data: newUser });
	} catch (error) {
		console.error("Lỗi trong quá trình đăng ký:", error);
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

module.exports = {
	register,
};
