const bcrypt = require("bcrypt");
const User = require("../models/users.model");

const register = async (req, res, next) => {
	try {
		const { email, password, fullName, username, phone } = req.body;
		console.log(req.body);
		if (!email || !password)
			return response
				.status(400)
				.json({ message: "Email and Password cannot be null", data: req.body });

		console.log(1);
		const isEmail = await User.findOne({ where: { email } }).catch((err) =>
			console.error("Error finding email:", err)
		);
		console.log("isEmail", isEmail);
		const isUsername = await User.findOne({ where: { username: username } }).catch((err) =>
			console.error("Error finding username:", err)
		);
		console.log(2);

		if (isEmail) return res.status(400).json({ message: "Email is existed", data: req.body });

		if (isUsername)
			return res.status(400).json({ message: "Username is existed", data: req.body });
		console.log(3);
		const salt = await bcrypt.genSalt(10);
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const newUser = await User.create({
			...req.body,
			password: hashPassword,
			role: 2,
		});
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
