const db = require("../config/db");

function findUserByEmail(email, callback) {
  db.query("SELECT * FROM users WHERE email=?", [email], callback);
}

function createUser(data, callback) {
  const { username, email, password } = data;
  db.query(
    "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
    [username, email, password],
    callback
  );
}

module.exports = { findUserByEmail, createUser };
