// const express = require("express");
// const router = express.Router();
// const path = require("path");
// const { register, login, logout } = require("../controllers/authController");

// router.post("/register", register);
// router.post("/login", login);
// router.post("/logout", logout);

// router.get("/login", (req, res) => {
//     res.sendFile(path.join(__dirname, "../views/login.html"));
// });
// router.get("/register", (req, res) => {
//     res.sendFile(path.join(__dirname, "../views/register.html"));
// });
// router.get("/logout", (req, res) => {
//     res.redirect("/login");
// }); 
// router.get("/dashboard", (req, res) => {
//     res.sendFile(path.join(__dirname, "../views/dashboard.html"));
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { protectPage } = require("../middleware/authMiddleware");
router.get("/", (req, res) => {
    res.sendFile("login.html", { root: "views" });
});

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "views" });
});

router.post("/login", authController.login);

router.get("/logout", authController.logout);
router.get("/auth/google",
    passport.authenticate("google", { scope: ["profile","email"] })
);

router.get("/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);
// Show register page
router.get("/register", (req,res)=>{
    res.sendFile("register.html",{root:"views"});
});

// Handle register
router.post("/register", authController.register);

module.exports = router;


