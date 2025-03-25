const verificationEmail = (email, verificationCode) => {
	return {
		to: email,
		subject: "🔐 Verify Your Email Address",
		text: `Hello, your verification code is: ${verificationCode}. Enter this code to verify your email. Do not share this code with anyone for security reasons.`,
		html: `
			<div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 8px; padding: 20px;">
				<div style="text-align: center;">
					<h1 style="color: #007bff;">Verify Your Email</h1>
					<p style="color: #555;">Thank you for signing up! Please use the code below to verify your email:</p>
					<h2 style="background: #f8f9fa; padding: 10px; display: inline-block; border-radius: 5px; color: #d9534f;">${verificationCode}</h2>
					<p style="margin-top: 20px;">
						<a href="https://yourwebsite.com/verify?code=${verificationCode}" 
						   style="padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">
							Verify My Email
						</a>
					</p>
					<p style="color: #d9534f; font-weight: bold;">⚠️ Do not share this code with anyone.</p>
					<hr style="border: none; border-top: 1px solid #ddd;">
					<p style="font-size: 14px; color: #888;">If you did not request this, please ignore this email.</p>
				</div>
			</div>
		`,
	};
};

const resetPasswordEmail = (email, resetLink) => {
	return {
		to: email,
		subject: "🔑 Reset Your Password",
		text: `Click the following link to reset your password: ${resetLink}. If you did not request this, please ignore this email.`,
		html: `
			<h1 style="color: #007bff; text-align: center;">Password Reset</h1>
			<p>Click the button below to reset your password:</p>
			<p style="text-align: center;">
				<a href="${resetLink}" style="display: inline-block; padding: 12px 24px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
			</p>
			<p style="color: #d9534f;">⚠️ If you did not request this, ignore this email.</p>
			<hr>
			<p>Best regards,</p>
			<p><strong>Customer Support Team</strong></p>
		`,
	};
};

const accountActivatedEmail = (email, activationCode) => {
	return {
		to: email,
		subject: "🎉 Your Account is Now Active!",
		text: `Hello, your account has been activated! Your activation code is: ${activationCode}. Use this code to complete your activation.`,
		html: `
			<h1 style="color: #28a745; text-align: center;">Welcome!</h1>
			<p>Your account has been successfully activated. Use the activation code below to complete the process:</p>
			<h2 style="color: #ff0000; text-align: center;">${activationCode}</h2>
			<p>If you encounter any issues, please contact our support team.</p>
			<hr>
			<p>Best regards,</p>
			<p><strong>Customer Support Team</strong></p>
		`,
	};
};

const accountDisabledEmail = (email, reason) => {
	return {
		to: email,
		subject: "⚠️ Account Disabled",
		text: `Hello, your account has been disabled for the following reason: ${reason}. Contact support for further assistance.`,
		html: `
			<h1 style="color: #dc3545; text-align: center;">Account Disabled</h1>
			<p>Your account has been <strong style="color: #dc3545;">disabled</strong> due to:</p>
			<p style="color: #dc3545; font-weight: bold;">"${reason}"</p>
			<p>If this is a mistake, please contact support:</p>
			<p style="text-align: center;">
				📩 <a href="mailto:support@yourwebsite.com">support@yourwebsite.com</a>
			</p>
			<hr>
			<p>Best regards,</p>
			<p><strong>Support Team</strong></p>
		`,
	};
};

module.exports = {
	verificationEmail,
	resetPasswordEmail,
	accountActivatedEmail,
	accountDisabledEmail,
};
