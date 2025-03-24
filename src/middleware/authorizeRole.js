const User = require("../models/user.model");

const authorizeRole = async (req, res, next) => {
	if (req.authenticatedUser.role === requiredRole) {
		return next();
	}
	return res.status(403).send({
		message: "Account does not have permission to do this!",
	}); // Nếu vai trò không khớp, trả về 403
};

const authorize = {
	authorizeRole: authorizeRole,
};

module.exports = authorize;
