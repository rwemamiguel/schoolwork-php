// const db = require("../config/db");

// function getAllSuppliers(callback) {
//   db.query("SELECT * FROM suppliers", callback);
// }

// function createSupplier(data, callback) {
//   const { sup_name, sup_phone, sup_email } = data;
//   db.query(
//     "INSERT INTO suppliers (sup_name, sup_phone, sup_email) VALUES (?, ?, ?)",
//     [sup_name, sup_phone, sup_email],
//     callback
//   );
// }

// module.exports = { getAllSuppliers, createSupplier };


const db = require("../config/db");

exports.getAll = (callback) => {
    db.query("SELECT * FROM suppliers", callback);
};

exports.create = (data, callback) => {
    db.query(
        "INSERT INTO suppliers (sup_name, phone, email) VALUES (?, ?, ?)",
        [data.sup_name, data.phone, data.email],
        callback
    );
};

exports.delete = (id, callback) => {
    db.query("DELETE FROM suppliers WHERE sup_id=?", [id], callback);
};

