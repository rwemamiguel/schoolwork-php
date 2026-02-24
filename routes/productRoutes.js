// const express = require('express');
// const router = express.Router();
// const productController = require('../controllers/productController');
// const { protectPage } = require('../middleware/authMiddleware');

// router.use(protectPage);

// // product operations
// router.get('/list', productController.list);
// router.post('/add', productController.add);
// router.post('/update/:id', productController.update);
// router.get('/delete/:id', productController.delete);

// // stock update route
// router.post('/stock', productController.stock);
// const { protectPage, checkRole } = require("../middleware/authMiddleware");

// router.post("/delete/:id", protectPage, checkRole("admin"), controller.delete);
// module.exports = router;



const express = require("express");
const router = express.Router();
const { protectPage, checkRole } = require("../middleware/authMiddleware");
const controller = require("../controllers/productController");
console.log(controller);
router.get("/", protectPage, (req, res) => {
    res.sendFile("products.html", { root: "views" });
});

router.get("/api", protectPage, controller.getAll);

router.post("/create", protectPage, checkRole("admin"), controller.create);

router.post("/delete/:id", protectPage, checkRole("admin"), controller.delete);

module.exports = router;
