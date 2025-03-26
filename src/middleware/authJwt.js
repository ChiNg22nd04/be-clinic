const jwt = require("jsonwebtoken");
const { TokenExpiredError } = jwt;

// Hàm xử lý lỗi token
const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		console.log("❌ Token hết hạn!");
		return res.status(401).send({ message: "Unauthorized! Access Token has expired!" });
	}
	console.log("❌ Token không hợp lệ!");
	return res.status(401).send({ message: "Unauthorized!" });
};

// Middleware xác thực token
const verifyToken = (req, res, next) => {
	const authHeader = req.header("Authorization");
	console.log(req.header);
	console.log("📌 Header Authorization nhận được:", authHeader);

	// Kiểm tra header có tồn tại không
	if (!authHeader) {
		console.log("❌ Không có token!");
		return res.status(403).send({ message: "No token provided!" });
	}

	// Kiểm tra token có đúng định dạng "Bearer <token>" không
	if (!authHeader.startsWith("Bearer ")) {
		console.log("❌ Token không đúng định dạng!");
		return res.status(400).send({ message: "Invalid token format!" });
	}

	// Tách token từ chuỗi "Bearer <token>"
	const token = authHeader.replace("Bearer ", "").trim();
	console.log("🔍 Token sau khi tách:", token);

	jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
		if (err) {
			console.log("❌ JWT verify error:", err);
			return catchError(err, res);
		}

		console.log("✅ User authenticated:", decoded);
		req.user = decoded;

		next();
		console.log("✅ Token verification passed, proceeding...");
	});
};

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

module.exports = { verifyToken, authorizeRole };

// const jwt = require("jsonwebtoken");
// const { TokenExpiredError } = jwt;

// // Hàm xử lý lỗi token
// const catchError = (err, res) => {
// 	if (err instanceof TokenExpiredError) {
// 		console.log("❌ Token hết hạn!");
// 		return res.status(401).send({ message: "Unauthorized! Access Token has expired!" });
// 	}
// 	console.log("❌ Token không hợp lệ!");
// 	return res.status(401).send({ message: "Unauthorized!" });
// };

// // Middleware xác thực token
// const verifyToken = (req, res, next) => {
// 	const authHeader = req.header("Authorization");
// 	console.log("📌 Header Authorization nhận được:", authHeader);

// 	// Kiểm tra header có tồn tại không
// 	if (!authHeader) {
// 		console.log("❌ Không có token!");
// 		return res.status(403).send({ message: "No token provided!" });
// 	}

// 	// Kiểm tra token có đúng định dạng "Bearer <token>" không
// 	if (!authHeader.startsWith("Bearer ")) {
// 		console.log("❌ Token không đúng định dạng!");
// 		return res.status(400).send({ message: "Invalid token format!" });
// 	}

// 	// Tách token từ chuỗi "Bearer <token>"
// 	const token = authHeader.replace("Bearer ", "").trim();
// 	console.log("🔍 Token sau khi tách:", token);

// 	jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
// 		if (err) {
// 			return catchError(err, res);
// 		}

// 		console.log("✅ User authenticated:", decoded);
// 		req.user = decoded;
// 		next();
// 	});
// };

// module.exports = { verifyToken };
