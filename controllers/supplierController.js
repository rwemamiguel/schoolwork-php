const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.list = (req,res)=>{
    db.query("SELECT * FROM suppliers",(err,rows)=>{
        if (err) return res.send(err.message);

        let tableRows = '';
        rows.forEach((s) => {
            tableRows += `
            <tr>
                <td>${s.sup_id}</td>
                <td>${s.sup_name}</td>
                <td>${s.sup_phone || '-'}</td>
                <td>${s.sup_email || '-'}</td>
            </tr>
            `;
        });

        const filePath = path.join(__dirname, '../views/suppliers.html');
        fs.readFile(filePath, 'utf8', (readErr, html) => {
            if (readErr) return res.send(readErr.message);
            html = html.replace('{{SUPPLIER_ROWS}}', tableRows);
            res.send(html);
        });
    });
};

exports.add = (req,res)=>{
    const {sup_name, sup_phone, sup_email} = req.body;

    db.query(
        "INSERT INTO suppliers(sup_name,sup_phone,sup_email) VALUES(?,?,?)",
        [sup_name, sup_phone || null, sup_email || null],
        (err) => {
            if (err) return res.send(err.message);
            res.redirect('/suppliers');
        }
    );
};
