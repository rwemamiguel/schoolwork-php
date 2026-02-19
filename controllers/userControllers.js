const db = require("../config/db");
const path = require("path");
exports.list = (req, res) => {

    db.query("SELECT * FROM products", (err, rows) => {
        if (err) return res.send(err.message);
        res.sendFile(path.join(__dirname, "../views/products.html"));

        let tableRows = "";
        rows.forEach((row) => {
            tableRows += `
                <tr>
                    <td>${row.pro_id}</td>
                    <td>${row.pro_name}</td>
                    <td>${row.quantity}</td>
                    <td>${row.sup_id}</td>
                    <td>
                        <form method="POST" action="/products/stock">
                            <input type="hidden" name="id" value="${row.pro_id}">
                            <input type="number" name="qty" placeholder="Qty" required>
                            <select name="type">
                                <option value="IN">IN</option>
                                <option value="OUT">OUT</option>
                            </select>
                            <button>Update</button>
                        </form>
                        <a href="/products/delete/${row.pro_id}">Delete</a>
                    </td>
                </tr>
            `;
        });

        // Inject rows into HTML
        const fs = require("fs");
        const filePath = path.join(__dirname, "../views/products.html");
        fs.readFile(filePath, "utf8", (err, html) => {
            if (err) return res.send(err.message);
            html = html.replace("{{TABLE_ROWS}}", tableRows);
            res.send(html);
        });
    });
};
exports.dashboardStats = (req, res) => {
    const stats = {};

    db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, r1) => {
        stats.products = r1[0].totalProducts;

        db.query("SELECT COUNT(*) AS totalSuppliers FROM suppliers", (err, r2) => {
            stats.suppliers = r2[0].totalSuppliers;

            db.query("SELECT COUNT(*) AS totalTransactions FROM transactions", (err, r3) => {
                stats.transactions = r3[0].totalTransactions;
                res.json(stats);
            });
        });
    });
};


