// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const { getDashboardData } = require("../controllers/dashboardController");

// //router.get("/", protect, getDashboardData);
// router.get("/", protectPage, (req, res) => {
//     res.sendFile("dashboard.html", { root: "public" });
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const { protectPage } = require("../middleware/authMiddleware");
const dashboardController = require("../controllers/dashboardController");

router.get('/dashboard', dashboardController.view);
router.get('/api/dashboard', dashboardController.api);
router.get("/", protectPage, (req, res) => {
    res.sendFile("dashboard.html", { root: "views" });
});


router.get("/user-info", protectPage, (req, res) => {
    res.json({
        username: req.user.username,
        role: req.user.role
    });
});

module.exports = router;