const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/sequelize");
const User = require("../models/user.model");
require("dotenv").config();

const register = async (req, res, next) => {
	try {
		const { email, password, fullName, username, phone, role } = req.body;
		if (!email || !password)
			return response
				.status(400)
				.json({ message: "Email and Password cannot be null", data: req.body });

		const result = await sequelize.query("SELECT TOP 1 * FROM [User] WHERE email = :email", {
			replacements: { email },
			type: sequelize.QueryTypes.SELECT,
		});

		const isEmail = result.length ? result[0] : null;
		if (isEmail) return res.status(400).json({ message: "Email is existed", data: req.body });

		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

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
		return res.status(201).json({ message: "Register success", data: newUser });
	} catch (error) {
		console.error("Register fail:", error);
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

// const result = await sequelize.query("SELECT * FROM [User] WHERE email = :email", {
// 	replacements: { email },
// 	type: sequelize.QueryTypes.SELECT,
// });
// const isEmail = result.length ? result[0] : null;
// if (isEmail) return res.status(400).json({ message: "Email is existed", data: req.body });

const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);

		const user = await User.findOne({ where: { email } });
		console.log(user);
		if (!user) {
			return res.status(400).json({ message: "User is not found", data: req.body });
		}

		if (!user.isActive) {
			return res.status(403).json({ message: "Account is disabled", data: req.body });
		}

		const passwordIsValid = bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) {
			return res.status(401).json({ message: "Password is incorrect", data: req.body });
		}

		// 🔹 Luôn tạo token mới khi đăng nhập
		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			process.env.SECRET_KEY,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({
			message: "Login success",
			user: {
				id: user.id,
				email: user.email,
				role: user.role,
				active: user.isActive,
				accessToken: token,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Server error", details: error.message });
	}
};

module.exports = { login };

module.exports = {
	register,
	login,
};
