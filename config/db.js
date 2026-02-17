const mysql = require("mysql2");
require("dotenv").config();

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});
if (conn.connect) {
  console.log("Connected to MySQL database");
} else {
  console.error("Error connecting to MySQL database:", conn.connect);
}

module.exports = conn;
