const express = require('express');
const router = express.Router();
const controller = require('../controllers/supplierController');

router.get('/', controller.list);
router.post('/add', controller.add);

module.exports = router;
