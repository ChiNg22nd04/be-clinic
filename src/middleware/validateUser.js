const validateUser = (mode = "register") => {
	return async (req, res, next) => {
		try {
			const { email, password, fullName, username, phone, role } = req.body;

			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!email || !emailRegex.test(email)) {
				return res.status(400).json({ message: "Invalid email format." });
			}
			console.log(email);

			if (!password) {
				return res.status(400).json({ message: "Password is required." });
			}
			console.log(password);

			if (mode === "register") {
				console.log("register");
				if (phone && !/^[0-9]{10,11}$/.test(phone)) {
					return res.status(400).json({ message: "Invalid phone number format." });
				}

				if (role && ![0, 1, 2, 3].includes(Number(role))) {
					return res.status(400).json({ message: "Invalid role." });
				}
			}

			next();
		} catch (err) {
			console.error("Validation error:", err.message);
			res.status(500).json({ message: "Server error, please try again later." });
		}
	};
};

module.exports = { validateUser };
