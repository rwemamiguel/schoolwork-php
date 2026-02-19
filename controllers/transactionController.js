const db = require('../config/db');

exports.stockIn = (req, res) => {
    const { product_id, quantity } = req.body;

    db.query(
        "UPDATE products SET quantity = quantity + ? WHERE pro_id=?",
        [quantity, product_id]
    );

    db.query(
        "INSERT INTO transactions (pro_id, type, quantity) VALUES (?, 'IN', ?)",
        [product_id, quantity]
    );

    res.redirect('/products');
};

exports.stockOut = (req, res) => {
    const { product_id, quantity } = req.body;

    db.query(
        "UPDATE products SET quantity = quantity - ? WHERE pro_id=?",
        [quantity, product_id]
    );

    db.query(
        "INSERT INTO transactions (pro_id, type, quantity) VALUES (?, 'OUT', ?)",
        [product_id, quantity]
    );

    res.redirect('/products');
};
