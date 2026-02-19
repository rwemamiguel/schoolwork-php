const express = require('express');
const router = express.Router();
const controller = require('../controllers/supplierController');
const { protectPage } = require('../middleware/authMiddleware');

router.use(protectPage);
router.get('/', controller.list);
router.post('/add', controller.add);

module.exports = router;
