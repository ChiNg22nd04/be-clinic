const jwt = require("jsonwebtoken");

const { TokenExpiredError } = jwt;

// Hàm xử lý lỗi token
const catchError = (err, res) => {
	if (err instanceof TokenExpiredError) {
		return res.status(401).send({ message: "Unauthorized! Access Token has expired!" });
	}
	return res.status(401).send({ message: "Unauthorized!" });
};

// Middleware xác thực token
const verifyToken = (req, res, next) => {
	const token = req.header("Authorization")?.replace("Bearer ", "");
	if (!token) {
		console.log("❌ No token provided!");
		return res.status(403).send({ message: "No token provided!" });
	}

	jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
		if (err) {
			return catchError(err, res);
		}
		console.log("✅ User authenticated:", decoded);

		// Lưu user vào request để các middleware/controller khác dùng
		req.user = decoded;
		next();
	});
};

const authJwt = {
	verifyToken: verifyToken,
};
module.exports = authJwt;
