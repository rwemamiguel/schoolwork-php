const express = require('express');
const db = require('../config/db');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', (req, res) => {
    res.sendFile(require('path').join(__dirname, '../views/products.html'));
});

// product operations
router.get('/list', productController.list);
router.post('/add', productController.add);
router.post('/update/:id', productController.update);
router.get('/delete/:id', productController.delete);

// stock update route
router.post('/stock', productController.stock);

module.exports = router;
