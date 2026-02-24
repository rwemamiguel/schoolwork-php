const db = require('../config/db');
const path = require('path');

exports.list = (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    db.query(`
        SELECT t.*, p.pro_name
        FROM transactions t
        JOIN products p ON t.pro_id = p.pro_id
        ORDER BY t.created_at DESC
    `, (err, rows) => {

        let tableRows = '';

        rows.forEach(t => {
            tableRows += `
            <tr>
                <td>${t.trans_id}</td>
                <td>${t.pro_name}</td>
                <td>${t.type}</td>
                <td>${t.quantity}</td>
                <td>${t.created_at}</td>
            </tr>`;
        });

        res.send(`
            <h1>Stock Transactions</h1>
            <table border="1">
            <tr>
                <th>ID</th>
                <th>Product</th>
                <th>Type</th>
                <th>Qty</th>
                <th>Date</th>
            </tr>
            ${tableRows}
            </table>
        `);
    });
};