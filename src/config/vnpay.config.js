module.exports = {
	vnp_TmnCode: process.env.YOUR_TMN_CODE, // mã website nhận từ VNPAY
	vnp_HashSecret: process.env.YOUR_SECRET_KEY_VNPAY, // key bảo mật
	vnp_Url: process.env.VNP_URL, // link test
	vnp_ReturnUrl: "http://localhost:3000/payment-return", // frontend URL sau khi thanh toán
};
