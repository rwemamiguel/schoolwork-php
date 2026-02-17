const Product = require("../models/productModel");

function getAllProducts(req, res) {
  Product.getAllProducts((err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
}

function createProduct(req, res) {
  Product.createProduct(req.body, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: "Product added" });
  });
}

function deleteProduct(req, res) {
  Product.deleteProduct(req.params.id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: "Product deleted" });
  });
}

module.exports = { getAllProducts, createProduct, deleteProduct };
