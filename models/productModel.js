const db = require("../config/db");

function getAllProducts(callback) {
  const sql = `SELECT p.*, s.sup_name 
               FROM products p
               LEFT JOIN suppliers s ON p.sup_id = s.sup_id`;
  db.query(sql, callback);
}

function createProduct(data, callback) {
  const { pro_name, quantity, sup_id } = data;
  db.query(
    "INSERT INTO products (pro_name, quantity, sup_id) VALUES (?, ?, ?)",
    [pro_name, quantity, sup_id],
    callback
  );
}

function deleteProduct(id, callback) {
  db.query("DELETE FROM products WHERE pro_id=?", [id], callback);
}

module.exports = { getAllProducts, createProduct, deleteProduct };
