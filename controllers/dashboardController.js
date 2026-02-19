const db = require("../config/db");

function getDashboardData(req, res) {
  const data = {};

  db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to load total products" });
    data.totalProducts = result[0].totalProducts;

    db.query("SELECT COUNT(*) AS totalSuppliers FROM suppliers", (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to load total suppliers" });
      data.totalSuppliers = result[0].totalSuppliers;

      db.query(
        `SELECT p.pro_id, p.pro_name, p.quantity, s.sup_name
         FROM products p
         LEFT JOIN suppliers s ON s.sup_id = p.sup_id
         WHERE p.quantity < 5`,
        (err, result) => {
        if (err) return res.status(500).json({ message: "Failed to load low stock data" });
        data.lowStock = result;
        res.json(data);
      });
    });
  });
}

module.exports = { getDashboardData };
