const Supplier = require("../models/supplierModel");

function getAllSuppliers(req, res) {
  Supplier.getAllSuppliers((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}

function createSupplier(req, res) {
  Supplier.createSupplier(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: "Supplier added" });
  });
}

module.exports = { getAllSuppliers, createSupplier };
