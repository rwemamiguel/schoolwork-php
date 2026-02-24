// const db = require('../config/db');
// const path = require('path');
// const fs = require('fs');

// exports.list = (req,res)=>{
//     db.query("SELECT * FROM suppliers",(err,rows)=>{
//         if (err) return res.send(err.message);

//         let tableRows = '';
//         rows.forEach((s) => {
//             tableRows += `
//             <tr>
//                 <td>${s.sup_id}</td>
//                 <td>${s.sup_name}</td>
//                 <td>${s.sup_phone || '-'}</td>
//                 <td>${s.sup_email || '-'}</td>
//             </tr>
//             `;
//         });

//         const filePath = path.join(__dirname, '../views/suppliers.html');
//         fs.readFile(filePath, 'utf8', (readErr, html) => {
//             if (readErr) return res.send(readErr.message);
//             html = html.replace('{{SUPPLIER_ROWS}}', tableRows);
//             res.send(html);
//         });
//     });
// };

// exports.add = (req,res)=>{
//     const {sup_name, sup_phone, sup_email} = req.body;

//     db.query(
//         "INSERT INTO suppliers(sup_name,sup_phone,sup_email) VALUES(?,?,?)",
//         [sup_name, sup_phone || null, sup_email || null],
//         (err) => {
//             if (err) return res.send(err.message);
//             res.redirect('/suppliers');
//         }
//     );
// };


const supplierModel = require("../models/supplierModel");

const db = require('../config/db');
const path = require('path');
const fs = require('fs');

/*
====================
GET ALL SUPPLIERS
====================
*/
exports.getAll = (req, res) => {
    db.query("SELECT * FROM suppliers ORDER BY sup_id DESC", (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json(results);
    });
};


/*
====================
CREATE SUPPLIER
====================
*/
exports.create = (req, res) => {
    const { sup_name, phone } = req.body;

    if (!sup_name || !phone) {
        return res.status(400).json({ message: "All fields required" });
    }

    db.query(
        "INSERT INTO suppliers (sup_name, phone) VALUES (?, ?)",
        [sup_name, phone],
        (err) => {
            if (err) return res.status(500).json({ message: err.message });
            res.json({ message: "Supplier created successfully" });
        }
    );
};


/*
====================
DELETE SUPPLIER
====================
*/
exports.delete = (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM suppliers WHERE sup_id = ?", [id], (err) => {
        if (err) return res.status(500).json({ message: err.message });
        res.json({ message: "Supplier deleted successfully" });
    });
};