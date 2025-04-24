const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadImage = (folderName) => {
	// Tạo folder nếu chưa tồn tại
	const storagePath = path.join(__dirname, "..", "uploads", folderName);
	if (!fs.existsSync(storagePath)) {
		fs.mkdirSync(storagePath, { recursive: true });
	}

	const storage = multer.diskStorage({
		destination: function (req, file, cb) {
			cb(null, storagePath);
		},
		filename: function (req, file, cb) {
			const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
			cb(null, uniqueSuffix + path.extname(file.originalname));
		},
	});

	return multer({ storage });
};

module.exports = uploadImage;

// const multer = require("multer");
// const path = require("path");

// const storage = multer.diskStorage({
// 	destination: function (req, file, cb) {
// 		cb(null, "uploads/"); // Thư mục lưu tạm
// 	},
// 	filename: function (req, file, cb) {
// 		const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 		cb(null, uniqueSuffix + path.extname(file.originalname));
// 	},
// });

// const upload = multer({ storage });

// module.exports = upload;
