const express = require("express");
const router = express.Router();
const { logout ,login } = require("../controllers/authController");

router.post("/login", login);
router.post("/logout", logout);
router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html"));
});
router.get("/logout", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "logout.html"));
}); 
router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "dashboard.html"));
});
module.exports = router;