// const express = require('express');
// const router = express.Router();
// const controller = require('../controllers/supplierController');
// const { protectPage } = require('../middleware/authMiddleware');

// router.use(protectPage);
// router.get('/', controller.list);
// router.post('/add', controller.add);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { protectPage, checkRole } = require("../middleware/authMiddleware");
const controller = require("../controllers/supplierController");

router.get("/", protectPage, (req, res) => {
    res.sendFile("suppliers.html", { root: "views" });
});

router.get("/api", protectPage, controller.getAll);

router.post("/create", protectPage, checkRole("admin"), controller.create);

router.post("/delete/:id", protectPage, checkRole("admin"), controller.delete);

module.exports = router;
