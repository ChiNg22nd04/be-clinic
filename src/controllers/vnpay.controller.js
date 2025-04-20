const moment = require("moment");
const crypto = require("crypto");
const qs = require("qs");
const config = require("../config/vnpay.config");

exports.createPaymentUrl = (req, res) => {
	const ipAddr = req.headers["x-forwarded-for"] || req.connection.remoteAddress;

	const tmnCode = config.vnp_TmnCode;
	const secretKey = config.vnp_HashSecret;
	const vnpUrl = config.vnp_Url;
	const returnUrl = config.vnp_ReturnUrl;

	const date = new Date();
	const createDate = moment(date).format("YYYYMMDDHHmmss");
	const orderId = moment(date).format("HHmmss");
	const amount = req.body.amount;
	const bankCode = req.body.bankCode;

	const orderInfo = "Thanh toan VNPAY";
	const orderType = "other";
	const locale = req.body.language || "vn";

	const currCode = "VND";
	const vnp_Params = {
		vnp_Version: "2.1.0",
		vnp_Command: "pay",
		vnp_TmnCode: tmnCode,
		vnp_Locale: locale,
		vnp_CurrCode: currCode,
		vnp_TxnRef: orderId,
		vnp_OrderInfo: orderInfo,
		vnp_OrderType: orderType,
		vnp_Amount: amount * 100, // nhân 1000 sau đó *100 vì VNPAY tính theo đồng
		vnp_ReturnUrl: returnUrl,
		vnp_IpAddr: ipAddr,
		vnp_CreateDate: createDate,
	};

	if (bankCode) {
		vnp_Params["vnp_BankCode"] = bankCode;
	}

	const sortedParams = sortObject(vnp_Params);
	const signData = qs.stringify(sortedParams, { encode: false });
	const hmac = crypto.createHmac("sha512", secretKey);
	const signed = hmac.update(new Buffer.from(signData, "utf-8")).digest("hex");
	sortedParams["vnp_SecureHash"] = signed;
	const paymentUrl = `${vnpUrl}?${qs.stringify(sortedParams, { encode: false })}`;

	return res.json({ paymentUrl });
};

function sortObject(obj) {
	const sorted = {};
	const keys = Object.keys(obj).sort();
	for (let key of keys) {
		sorted[key] = obj[key];
	}
	return sorted;
}
