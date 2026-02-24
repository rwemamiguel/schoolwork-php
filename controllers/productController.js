// const db = require('../config/db');
// const path = require('path');

// exports.list = (req, res) => {

//     const sql = `
//         SELECT p.*, s.sup_name 
//         FROM products p
//         LEFT JOIN suppliers s ON p.sup_id = s.sup_id
//     `;

//     db.query(sql, (err, rows) => {

//         if (err) return res.send(err.message);

//         let tableRows = '';

//         rows.forEach(p => {
//             tableRows += `
//             <tr>
//                 <td>${p.pro_id}</td>
//                 <td>${p.pro_name}</td>
//                 <td>${p.quantity}</td>
//                 <td>${p.sup_name || 'N/A'}</td>
//                 <td>

//                     <!-- Stock IN/OUT -->
//                     <form method="POST" action="/products/stock" style="display:inline;">
//                         <input type="hidden" name="id" value="${p.pro_id}">
//                         <input type="number" name="qty" placeholder="Qty" required style="width:70px">
//                         <select name="type">
//                             <option value="IN">IN</option>
//                             <option value="OUT">OUT</option>
//                         </select>
//                         <button class="btn btn-primary">Update</button>
//                     </form>

//                     <!-- Delete -->
//                     <a href="/products/delete/${p.pro_id}" class="btn btn-danger">Delete</a>

//                 </td>
//             </tr>
//             `;
//         });

//         // Inject rows into HTML
//         const fs = require('fs');
//         const filePath = path.join(__dirname, '../views/products.html');

//         fs.readFile(filePath, 'utf8', (err, html) => {
//             if (err) return res.send(err.message);

//             // Render current product rows into template.
//             html = html.replace('{{TABLE_ROWS}}', tableRows);
//             res.send(html);
//         });
//     });
// };



// exports.add = (req, res) => {

//     const { pro_name, quantity, sup_id } = req.body;

//     db.query(
//         "INSERT INTO products (pro_name, quantity, sup_id) VALUES (?, ?, ?)",
//         [pro_name, quantity, sup_id],
//         (err) => {
//             if (err) return res.send(err.message);
//             res.redirect('/products');
//         }
//     );
// };



// exports.stock = (req, res) => {

//     const { id, qty, type } = req.body;

//     const sql = type === "IN"
//         ? "UPDATE products SET quantity = quantity + ? WHERE pro_id = ?"
//         : "UPDATE products SET quantity = quantity - ? WHERE pro_id = ?";

//     db.query(sql, [qty, id], (err) => {
//         if (err) return res.send(err.message);

//         // log transaction
//         db.query(
//             "INSERT INTO transactions (pro_id, type, quantity) VALUES (?, ?, ?)",
//             [id, type, qty]
//         );

//         res.redirect('/products');
//     });
// };



// exports.delete = (req, res) => {

//     db.query(
//         "DELETE FROM products WHERE pro_id = ?",
//         [req.params.id],
//         (err) => {
//             if (err) return res.send(err.message);
//             res.redirect('/products');
//         }
//     );
// };



// exports.update = (req, res) => {

//     const { pro_name, quantity, sup_id } = req.body;

//     db.query(
//         "UPDATE products SET pro_name=?, quantity=?, sup_id=? WHERE pro_id=?",
//         [pro_name, quantity, sup_id, req.params.id],
//         (err) => {
//             if (err) return res.send(err.message);
//             res.redirect('/products');
//         }
//     );
// };



const productModel = require("../models/productModel");

const db = require('../config/db');
const path = require('path');
const fs = require('fs');

exports.list = (req, res) => {
    if (!req.session.user) return res.redirect('/login');

    db.query(`
        SELECT p.*, s.sup_name
        FROM products p
        LEFT JOIN suppliers s ON p.sup_id = s.sup_id
    `, (err, rows) => {

        let tableRows = '';

        rows.forEach(p => {
            tableRows += `
            <tr>
                <td>${p.pro_id}</td>
                <td>${p.pro_name}</td>
                <td>${p.quantity}</td>
                <td>${p.sup_name || '-'}</td>
                <td>
                    <input type="number" id="qty-${p.pro_id}" placeholder="Qty" style="width:70px">
                    <select id="type-${p.pro_id}">
                        <option value="IN">IN</option>
                        <option value="OUT">OUT</option>
                    </select>
                    <button class="btn btn-primary"
                        onclick="updateStock(${p.pro_id})">
                        Update
                    </button>
                    <a href="/products/delete/${p.pro_id}" class="btn btn-danger">Delete</a>
                </td>
            </tr>`;
        });

        const filePath = path.join(__dirname, '../views/products.html');

        fs.readFile(filePath, 'utf8', (err, html) => {
            html = html.replace('{{TABLE_ROWS}}', tableRows);
            res.send(html);
        });
    });
};

exports.add = (req, res) => {
    const { pro_name, quantity, sup_id } = req.body;

    db.query(
        "INSERT INTO products (pro_name, quantity, sup_id) VALUES (?, ?, ?)",
        [pro_name, quantity, sup_id],
        () => res.redirect('/products')
    );
};

exports.stock = (req, res) => {
    const { id, qty, type } = req.body;

    const sql = type === "IN"
        ? "UPDATE products SET quantity = quantity + ? WHERE pro_id = ?"
        : "UPDATE products SET quantity = quantity - ? WHERE pro_id = ?";

    db.query(sql, [qty, id], () => {

        db.query(
            "INSERT INTO transactions (pro_id, type, quantity) VALUES (?, ?, ?)",
            [id, type, qty]
        );

        res.json({ message: "Updated" });
    });
};

exports.delete = (req, res) => {
    db.query("DELETE FROM products WHERE pro_id = ?", [req.params.id], () => {
        res.redirect('/products');
    });
};