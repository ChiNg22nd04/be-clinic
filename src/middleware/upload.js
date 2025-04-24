// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// const uploadImage = (folderName) => {
// 	// Tạo thư mục nếu nó chưa tồn tại
// 	const storagePath = path.join(__dirname, "..", "uploads", folderName);
// 	if (!fs.existsSync(storagePath)) {
// 		fs.mkdirSync(storagePath, { recursive: true });
// 	}

// 	// Cấu hình lưu trữ cho multer
// 	const storage = multer.diskStorage({
// 		destination: function (req, file, cb) {
// 			cb(null, storagePath); // Đảm bảo tệp được lưu vào thư mục đã tạo
// 		},
// 		filename: function (req, file, cb) {
// 			const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
// 			// Đảm bảo phần mở rộng đúng (dùng path.extname)
// 			cb(null, uniqueSuffix + path.extname(file.originalname));
// 		},
// 	});

// 	// Cấu hình multer với kiểm tra loại tệp và giới hạn kích thước
// 	const upload = multer({
// 		storage,
// 		limits: {
// 			fileSize: 5 * 1024 * 1024, // Giới hạn 5MB mỗi tệp
// 		},
// 		fileFilter: (req, file, cb) => {
// 			// Định nghĩa các loại tệp hợp lệ (dựa trên mimetype)
// 			const filetypes = /jpeg|jpg|png|gif/;
// 			const extname = path.extname(file.originalname).toLowerCase(); // Lấy phần mở rộng và chuyển thành chữ thường
// 			const mimetype = file.mimetype.toLowerCase(); // Kiểm tra mimetype
// 			console.log("Mimetype:", file.mimetype);
// 			console.log("Extname:", path.extname(file.originalname));

// 			// Kiểm tra cả phần mở rộng và mimetype
// 			if (filetypes.test(extname) && filetypes.test(mimetype)) {
// 				return cb(null, true); // Nếu hợp lệ
// 			} else {
// 				// Nếu không hợp lệ, trả về lỗi
// 				cb(new Error("Invalid file type. Only JPG, JPEG, PNG, GIF files are allowed."));
// 			}
// 		},
// 	});

// 	return upload;
// };

// module.exports = uploadImage;

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
