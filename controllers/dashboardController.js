const db = require("../config/db");

function getDashboardData(req, res) {
  const data = {};

  db.query("SELECT COUNT(*) AS totalProducts FROM products", (err, result) => {
    data.totalProducts = result[0].totalProducts;

    db.query("SELECT COUNT(*) AS totalSuppliers FROM suppliers", (err, result) => {
      data.totalSuppliers = result[0].totalSuppliers;

      db.query("SELECT * FROM products WHERE quantity < 5", (err, result) => {
        data.lowStock = result;
        res.json(data);
      });
    });
  });
}

module.exports = { getDashboardData };
