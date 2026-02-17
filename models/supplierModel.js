const db = require("../config/db");

function getAllSuppliers(callback) {
  db.query("SELECT * FROM suppliers", callback);
}

function createSupplier(data, callback) {
  const { sup_name, sup_phone, sup_email } = data;
  db.query(
    "INSERT INTO suppliers (sup_name, sup_phone, sup_email) VALUES (?, ?, ?)",
    [sup_name, sup_phone, sup_email],
    callback
  );
}

module.exports = { getAllSuppliers, createSupplier };
