const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { protectPage } = require('../middleware/authMiddleware');

router.use(protectPage);

// product operations
router.get('/list', productController.list);
router.post('/add', productController.add);
router.post('/update/:id', productController.update);
router.get('/delete/:id', productController.delete);

// stock update route
router.post('/stock', productController.stock);

module.exports = router;
