# 🏥 Clinic Management System - Backend

Hệ thống quản lý phòng khám với API backend được xây dựng bằng Node.js, Express và Sequelize.

## 📋 Mô tả

Clinic Management System là một hệ thống quản lý phòng khám toàn diện, cung cấp các chức năng quản lý bệnh nhân, lịch hẹn, hồ sơ y tế, và quản lý nhân viên y tế. Hệ thống hỗ trợ ba vai trò người dùng chính: Bác sĩ, Lễ tân và Bệnh nhân.

## 🚀 Tính năng chính

### 👥 Quản lý người dùng

-   Đăng ký và đăng nhập với JWT authentication
-   Phân quyền theo vai trò (Doctor, Receptionist, User)
-   Quản lý thông tin cá nhân và hồ sơ
-   Upload và cập nhật avatar người dùng

### 🏥 Quản lý phòng khám

-   Quản lý thông tin phòng khám
-   Quản lý chuyên khoa và bác sĩ
-   Lịch làm việc và ca trực
-   Thông tin chuyên môn và thành tích bác sĩ

### 📅 Quản lý lịch hẹn

-   Đặt lịch hẹn khám bệnh
-   Quản lý lịch hẹn theo bác sĩ và thời gian
-   Cập nhật trạng thái lịch hẹn
-   Xem lịch sử lịch hẹn

### 📋 Hồ sơ y tế

-   Quản lý hồ sơ bệnh án
-   Đơn thuốc và chỉ định điều trị
-   Lịch sử khám bệnh
-   Upload hồ sơ y tế (ảnh, tài liệu)

### 💊 Quản lý thuốc

-   Danh mục thuốc
-   Quản lý đơn thuốc
-   Theo dõi sử dụng thuốc

### 💰 Quản lý hóa đơn

-   Tạo và quản lý hóa đơn
-   Xem lịch sử hóa đơn
-   Quản lý thanh toán

### 📧 Thông báo

-   Hệ thống thông báo email
-   Thông báo lịch hẹn và cập nhật

## 🛠️ Công nghệ sử dụng

-   **Backend Framework**: Node.js với Express.js
-   **Database**: SQL Server với Sequelize ORM
-   **Authentication**: JWT (JSON Web Tokens)
-   **File Upload**: Multer với Cloudinary
-   **Email Service**: Nodemailer
-   **API Documentation**: Swagger/OpenAPI
-   **Security**: bcrypt cho mã hóa mật khẩu
-   **CORS**: Hỗ trợ Cross-Origin Resource Sharing

## 📦 Cài đặt

### Yêu cầu hệ thống

-   Node.js (version 14 trở lên)
-   SQL Server
-   npm hoặc yarn

### Bước 1: Clone repository

```bash
git clone <repository-url>
cd be-clinic
```

### Bước 2: Cài đặt dependencies

```bash
npm install
```

### Bước 3: Cấu hình môi trường

Tạo file `.env` trong thư mục gốc và cấu hình các biến môi trường:

```env
# Server Configuration
PORT=3500
NODE_ENV=development

# Database Configuration
DB_HOST=localhost
DB_PORT=1433
DB_NAME=clinic_management
DB_USER=your_username
DB_PASSWORD=your_password
DB_DIALECT=mssql

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=24h

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Bước 4: Khởi chạy ứng dụng

```bash
# Development mode với nodemon
npm start

# Hoặc chạy trực tiếp
node index.js
```

Ứng dụng sẽ chạy tại: `http://localhost:3500`

## 📚 API Documentation

API documentation có sẵn tại: `http://localhost:3500/api-docs`

### Các endpoint chính:

#### 🔐 Authentication

-   `POST /auth/register` - Đăng ký tài khoản
-   `POST /auth/login` - Đăng nhập
-   `POST /auth/logout` - Đăng xuất

#### 👤 User Management

-   `POST /user/schedule-appointment` - Đặt lịch hẹn
-   `POST /user/appointments` - Lấy danh sách lịch hẹn
-   `POST /user/medical-history` - Lấy lịch sử khám bệnh
-   `PUT /user/profile` - Lấy thông tin cá nhân
-   `PUT /user/upload-profile` - Cập nhật thông tin cá nhân
-   `PUT /user/upload-avatar` - Upload avatar

#### 🏥 Common Routes

-   `GET /` - Thông tin giới thiệu
-   `GET /specialties` - Lấy danh sách chuyên khoa
-   `GET /clinics` - Lấy danh sách phòng khám
-   `POST /specialties/clinic-id` - Lấy chuyên khoa theo phòng khám
-   `POST /specialties/doctor-all` - Lấy tất cả chuyên khoa của bác sĩ
-   `POST /shifts-all` - Lấy tất cả ca trực
-   `POST /shifts/doctor-id` - Lấy ca trực theo bác sĩ
-   `GET /articles` - Lấy danh sách bài viết
-   `GET /achievements` - Lấy danh sách thành tích
-   `GET /professional` - Lấy danh sách bác sĩ
-   `POST /professional/doctor-id` - Lấy thông tin bác sĩ theo ID

#### 👨‍⚕️ Doctor Routes

-   `GET /doctor/medical-examination/get-all` - Lấy tất cả phiếu khám
-   `GET /doctor/medical-examination/get-detail` - Lấy chi tiết phiếu khám
-   `PUT /doctor/medical-examination/update` - Cập nhật phiếu khám
-   `POST /doctor/prescription/update-form` - Cập nhật đơn thuốc
-   `POST /doctor/prescription/form` - Lấy đơn thuốc
-   `GET /doctor/medicine/get-all` - Lấy danh sách thuốc

#### 📋 Receptionist Routes

-   `GET /receptionist/appointment/get-all` - Lấy tất cả lịch hẹn
-   `PUT /receptionist/appointment/update-status` - Cập nhật trạng thái lịch hẹn
-   `GET /receptionist/examination/get-all` - Lấy tất cả phiếu khám
-   `GET /receptionist/medical-examination/get-detail` - Lấy chi tiết phiếu khám
-   `POST /receptionist/invoice/create` - Tạo hóa đơn
-   `GET /receptionist/invoice/get-all` - Lấy tất cả hóa đơn
-   `PUT /receptionist/shifts/get-detail` - Lấy chi tiết ca trực
-   `POST /receptionist/prescription/form` - Lấy đơn thuốc

## 🗂️ Cấu trúc thư mục

```
src/
├── config/          # Cấu hình ứng dụng
├── controllers/     # Controllers xử lý logic
├── database/        # Cấu hình database
├── docs/           # Tài liệu
├── middleware/     # Middleware tùy chỉnh
├── models/         # Sequelize models
├── routes/         # API routes
├── services/       # Business logic services
├── swagger/        # Swagger documentation
└── uploads/        # File uploads
```

## 🔧 Scripts

```bash
# Khởi chạy development server
npm start

# Chạy tests
npm test
```

## 🔒 Bảo mật

-   JWT authentication cho tất cả API endpoints
-   Mã hóa mật khẩu với bcrypt
-   CORS configuration
-   Input validation và sanitization
-   Phân quyền theo vai trò (Role-based access control)

## 📧 Email Templates

Hệ thống hỗ trợ gửi email cho:

-   Xác nhận đăng ký
-   Nhắc nhở lịch hẹn
-   Thông báo thay đổi lịch hẹn
-   Đơn thuốc điện tử

## 🚀 Deployment

### Production

```bash
# Build ứng dụng
npm run build

# Chạy production
NODE_ENV=production node index.js
```

### Docker (Tùy chọn)

```dockerfile
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3500
CMD ["npm", "start"]
```

## 🤝 Đóng góp

1. Fork dự án
2. Tạo feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Mở Pull Request


## 📞 Liên hệ

-   **Tác giả**: [Nguyễn Lan Chi]
-   **Email**: [chiinglan4464@gmail.com](chiinglan4464@gmail.com)
-   **GitHub**: [ChiNg22nd04](https://github.com/ChiNg22nd04)

## 🙏 Cảm ơn

Cảm ơn bạn đã quan tâm đến Clinic Management System! Nếu có bất kỳ câu hỏi hoặc đề xuất nào, vui lòng tạo issue trên GitHub.
