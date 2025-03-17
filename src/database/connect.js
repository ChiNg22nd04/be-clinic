const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("ClinicManagement16th3_P3", "sa", "NewPassword@123", {
	host: "localhost",
	dialect: "mssql", // Sử dụng SQL Server
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Kết nối thành công đến database!");
  })
  .catch((err) => {
    console.error("Kết nối thất bại:", err);
  });

module.exports = sequelize;