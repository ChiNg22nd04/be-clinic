const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../database/sequelize");
require("dotenv").config();
const verificationCode = Math.floor(100000 + Math.random() * 900000); // Tạo mã 6 số

const {
	sendVerificationEmail,
	sendResetPasswordEmail,
	sendAccountActivatedEmail,
	sendAccountDisabledEmail,
} = require("../services/emailService");

const register = async (req, res) => {
	try {
		const { email, password, fullName, username, phone, role } = req.body;

		const hashPassword = await bcrypt.hash(password, 10);

		await sequelize.query(
			`INSERT INTO [User] (email, password, full_name, username, phone, role, verification_code) 
             VALUES (:email, :password, :full_name, :username, :phone, :role, :verification_code);`,
			{
				replacements: {
					email,
					password: hashPassword,
					full_name: fullName || null,
					username: username || null,
					phone: phone || null,
					role: Number(role) || 3,
					verification_code: verificationCode,
				},
				type: sequelize.QueryTypes.INSERT,
			}
		);

		await sendVerificationEmail(email, verificationCode);

		res.status(201).json({ message: "Register success, check email to verify" });
	} catch (error) {
		console.error("Register fail:", error);
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const [user] = await sequelize.query(`SELECT * FROM [User] WHERE email = :email`, {
			replacements: { email },
			type: sequelize.QueryTypes.SELECT,
		});

		if (!user) return res.status(404).json({ message: "User not found." });

		const passwordIsValid = bcrypt.compareSync(password, user.password);
		if (!passwordIsValid) {
			return res.status(401).json({ message: "Password is incorrect" });
		}

		const hashedPassword = bcrypt.hashSync("doctor123", 10);
		await sequelize.query(`UPDATE [User] SET password = :password WHERE email = :email`, {
			replacements: {
				email: "doctor@clinic.com",
				password: hashedPassword, // 🔥 Lưu mật khẩu đã băm
				role: 1,
				is_verified: 1, // Giả sử đã xác minh email
			},
			type: sequelize.QueryTypes.UPDATE,
		});

		if (!user.is_verified) {
			// Tạo mã xác minh mới (nếu cần) và gửi lại email
			await sequelize.query(
				`UPDATE [User] SET verification_code = :code WHERE email = :email`,
				{
					replacements: { code: verificationCode, email },
					type: sequelize.QueryTypes.UPDATE,
				}
			);
			await sendVerificationEmail(email, `Your verification code: ${verificationCode}`);
			return res.status(403).json({
				message: "Email not verified. Please verify with the OTP sent to your email.",
				requireVerification: true,
			});
		}

		if (!user.is_active) {
			await sendAccountDisabledEmail(
				email,
				`Inactive Account – Your account has been disabled due to prolonged inactivity. If you wish to reactivate your account, please contact our support team.`
			);
			return res.status(403).json({ message: "Your account has been disabled!" });
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role, fullName: user.full_name },
			process.env.SECRET_KEY,
			{ expiresIn: "1h" }
		);

		return res.status(200).json({
			message: "Login success",
			user: {
				id: user.id,
				fullName: user.full_name,
				email: user.email,
				role: user.role,
				isActive: user.is_active,
				isVerified: user.is_verified,
				accessToken: token,
			},
		});
	} catch (error) {
		console.error("Login error:", error);
		return res.status(500).json({ message: "Server error", details: error.message });
	}
};

const forgetPassword = async (req, res) => {
	try {
		const { email } = req.body;

		const [user] = await sequelize.query(`SELECT * FROM [User] WHERE email = :email`, {
			replacements: { email },
			type: sequelize.QueryTypes.SELECT,
		});

		if (!user) return res.status(404).json({ message: "User not found" });
		if (user.isVerified) return res.status(400).json({ message: "User already verified" });

		// Tạo mã OTP mới
		const newOTP = Math.floor(100000 + Math.random() * 900000);

		// Cập nhật mã mới trong database
		await sequelize.query(
			`UPDATE [User] SET verification_code = :verification_code WHERE email = :email`,
			{
				replacements: { email, verification_code: newOTP },
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		// Gửi email mã xác nhận mới
		await sendResetPasswordEmail(email, `Your verification code: ${newOTP}`);

		return res.status(200).json({ message: "Verification code resent" });
	} catch (error) {
		console.error("Resend OTP error:", error);
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

// const resendOPT = async (req, res) => {
// 	try {
// 		const { email } = req.body;

// 		const [user] = await sequelize.query(`SELECT * FROM [User] WHERE email = :email`, {
// 			replacements: { email },
// 			type: sequelize.QueryTypes.SELECT,
// 		});

// 		if (!user) return res.status(404).json({ message: "User not found" });
// 		if (user.isVerified) return res.status(400).json({ message: "User already verified" });

// 		// Tạo mã OTP mới
// 		const newOTP = Math.floor(100000 + Math.random() * 900000);

// 		// Cập nhật mã mới trong database
// 		await sequelize.query(
// 			`UPDATE [User] SET verification_code = :verification_code WHERE email = :email`,
// 			{
// 				replacements: { email, verification_code: newOTP },
// 				type: sequelize.QueryTypes.UPDATE,
// 			}
// 		);

// 		// Gửi email mã xác nhận mới
// 		await sendVerificationEmail(email, `Your verification code: ${newOTP}`);

// 		return res.status(200).json({ message: "Verification code resent" });
// 	} catch (error) {
// 		console.error("Resend OTP error:", error);
// 		res.status(500).json({ error: "Server error", details: error.message });
// 	}
// };

const resendOPT = async (req, res) => {
	try {
		const { email } = req.body;

		const [user] = await sequelize.query(`SELECT * FROM [User] WHERE email = :email`, {
			replacements: { email },
			type: sequelize.QueryTypes.SELECT,
		});

		if (!user) return res.status(404).json({ message: "User not found" });
		if (user.is_verified) return res.status(400).json({ message: "User already verified" });

		const now = new Date();
		const lastSentAt = user.otp_last_sent_at ? new Date(user.otp_last_sent_at) : null;

		// Kiểm tra nếu qua ngày thì reset count
		if (!lastSentAt || now.toDateString() !== lastSentAt.toDateString()) {
			user.otp_sent_count = 0;
		}

		if (user.otp_sent_count >= 5) {
			return res.status(429).json({
				message:
					"You have reached the maximum number of OTP requests today. Please try again tomorrow.",
			});
		}

		const newOTP = Math.floor(100000 + Math.random() * 900000);

		await sequelize.query(
			`UPDATE [User] 
			 SET verification_code = :verification_code,
			     otp_sent_count = :otp_sent_count,
			     otp_last_sent_at = :now
			 WHERE email = :email`,
			{
				replacements: {
					email,
					verification_code: newOTP,
					otp_sent_count: user.otp_sent_count + 1,
					now,
				},
				type: sequelize.QueryTypes.UPDATE,
			}
		);

		await sendVerificationEmail(email, `Your verification code: ${newOTP}`);
		return res.status(200).json({ message: "Verification code resent" });
	} catch (error) {
		console.error("Resend OTP error:", error);
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

const verifyOTP = async (req, res) => {
	try {
		const { email, verificationCode } = req.body;

		const [user] = await sequelize.query(`SELECT * FROM [User] WHERE email = :email`, {
			replacements: { email },
			type: sequelize.QueryTypes.SELECT,
		});

		if (!user) return res.status(404).json({ message: "User not found" });
		if (user.is_verified) return res.status(400).json({ message: "User already verified" });

		if (user.verification_code !== Number(verificationCode)) {
			return res.status(400).json({ message: "Invalid verification code" });
		}

		await sequelize.query(
			`UPDATE [User] SET is_verified = 1, verification_code = NULL WHERE email = :email`,
			{ replacements: { email }, type: sequelize.QueryTypes.UPDATE }
		);

		await sendAccountActivatedEmail(email);
		return res.status(200).json({ message: "Verification successful. Please login again." });
	} catch (error) {
		console.error("Verification error:", error);
		res.status(500).json({ error: "Server error", details: error.message });
	}
};

module.exports = {
	register,
	login,
	forgetPassword,
	resendOPT,
	verifyOTP,
};
