// const db = require("../config/db");

// function getAllProducts(callback) {
//   const sql = `SELECT p.*, s.sup_name 
//                FROM products p
//                LEFT JOIN suppliers s ON p.sup_id = s.sup_id`;
//   db.query(sql, callback);
// }

// function createProduct(data, callback) {
//   const { pro_name, quantity, sup_id } = data;
//   db.query(
//     "INSERT INTO products (pro_name, quantity, sup_id) VALUES (?, ?, ?)",
//     [pro_name, quantity, sup_id],
//     callback
//   );
// }

// function deleteProduct(id, callback) {
//   db.query("DELETE FROM products WHERE pro_id=?", [id], callback);
// }

// module.exports = { getAllProducts, createProduct, deleteProduct };



const db = require("../config/db");

exports.getAll = (callback) => {
    db.query(
        `SELECT p.*, s.sup_name 
         FROM products p
         LEFT JOIN suppliers s ON p.sup_id = s.sup_id`,
        callback
    );
};

exports.create = (data, callback) => {
    db.query(
        "INSERT INTO products (pro_name, quantity, price, sup_id) VALUES (?, ?, ?, ?)",
        [data.pro_name, data.quantity, data.price, data.sup_id],
        callback
    );
};

exports.update = (id, data, callback) => {
    db.query(
        "UPDATE products SET pro_name=?, price=?, sup_id=? WHERE pro_id=?",
        [data.pro_name, data.price, data.sup_id, id],
        callback
    );
};

exports.delete = (id, callback) => {
    db.query("DELETE FROM products WHERE pro_id=?", [id], callback);
};
