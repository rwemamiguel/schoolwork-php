const express = require("express");
const router = express.Router();
const path = require("path");
const { register, login, logout } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});
router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
});
router.get("/logout", (req, res) => {
    res.redirect("/login");
}); 
router.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

module.exports = router;
