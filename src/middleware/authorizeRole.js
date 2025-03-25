const jwt = require("jsonwebtoken");

const authorizeRole = (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];
	console.log("Middleware authorizeRole is running...");
	if (!token) {
		return res.status(401).json({ message: "Unauthorized: No token provided" });
	}

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.user = decoded; // Gán thông tin user vào request
		next();
	} catch (error) {
		return res.status(403).json({ message: "Invalid token" });
	}
};

module.exports = { authorizeRole };

// const User = require("../models/user.model");

// const authorizeRole = async (req, res, next) => {
// 	if (req.authenticatedUser.role === requiredRole) {
// 		return next();
// 	}
// 	return res.status(403).send({
// 		message: "Account does not have permission to do this!",
// 	}); // Nếu vai trò không khớp, trả về 403
// };

// const authorize = {
// 	authorizeRole: authorizeRole,
// };

// module.exports = authorize;
