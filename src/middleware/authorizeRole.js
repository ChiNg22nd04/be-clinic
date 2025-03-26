const authorizeRole = (...allowedRoles) => {
	return (req, res, next) => {
		if (!req.user) {
			console.log("❌ User not authenticated!");
			return res.status(401).json({ message: "Unauthorized: No user found" });
		}

		console.log("🔍 Checking user role:", req.user.role);

		if (!allowedRoles.includes(req.user.role)) {
			console.log("❌ Forbidden: User does not have permission");
			return res
				.status(403)
				.json({ message: "Forbidden: You do not have permission to access this resource" });
		}

		console.log("✅ Role authorized");
		next();
	};
};

module.exports = { authorizeRole };
