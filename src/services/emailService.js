const nodemailer = require("nodemailer");
const {
	verificationEmail,
	resetPasswordEmail,
	accountActivatedEmail,
	accountDisabledEmail,
	loginSuccessEmail,
} = require("./emailTemplates");

// Thiết lập transporter của Nodemailer
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

/**
 * Gửi email bằng template
 * @param {Object} emailTemplate - Đối tượng chứa thông tin email
 */
const sendEmail = async (emailTemplate) => {
	try {
		// Cấu hình thông tin gửi email
		const mailOptions = {
			from: `"Customer Support Team" <${process.env.EMAIL_USER}>`,
			to: emailTemplate.to,
			subject: emailTemplate.subject, // Tiêu đề
			text: emailTemplate.text,
			html: emailTemplate.html,
		};

		await transporter.sendMail(mailOptions);
		console.log(`📧 Email sent to: ${mailOptions.to}`);
	} catch (error) {
		console.error(`❌ Error sending email to ${mailOptions.to}:`, error);
	}
};

//Gửi email xác thực
const sendVerificationEmail = (email, verificationCode) => {
	const emailTemplate = verificationEmail(email, verificationCode);
	return sendEmail(emailTemplate);
};

//Gửi email đặt lại mật khẩu
const sendResetPasswordEmail = (email, resetLink) => {
	const emailTemplate = resetPasswordEmail(email, resetLink);
	return sendEmail(emailTemplate);
};

//Gửi email kích hoạt tài khoản
const sendAccountActivatedEmail = (email, activationCode) => {
	const emailTemplate = accountActivatedEmail(email, activationCode);
	return sendEmail(emailTemplate);
};

//Gửi email thông báo tài khoản bị vô hiệu hóa
const sendAccountDisabledEmail = (email, reason) => {
	const emailTemplate = accountDisabledEmail(email, reason);
	return sendEmail(emailTemplate);
};

//Gửi email đăng nhập thành công
const sendLoginSuccessEmail = (email) => {
	const emailTemplate = loginSuccessEmail(email);
	return sendEmail(emailTemplate);
};

module.exports = {
	sendVerificationEmail,
	sendResetPasswordEmail,
	sendAccountActivatedEmail,
	sendAccountDisabledEmail,
	sendLoginSuccessEmail,
};
