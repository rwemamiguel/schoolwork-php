const express = require("express");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const path = require("path");
const { register, login, logout } = require("../controllers/authController");
const { protectPage } = require("../middleware/authMiddleware");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "change_this_jwt_secret";

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/login.html"));
});

router.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../views/register.html"));
});

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/dashboard", protectPage, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/dashboard.html"));
});

router.get("/products", protectPage, (req, res) => {
    res.redirect("/products/list");
});

router.get("/stock", protectPage, (req, res) => {
    res.sendFile(path.join(__dirname, "../views/stock.html"));
});

router.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        const userId = req.user.user_id || req.user.id;
        const username = req.user.username || req.user.displayName || "user";
        const token = jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: "1h" });

        req.session.user = { id: userId, username };
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 3600000
        });
        res.redirect("/dashboard");
    }
);

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);

        req.session.destroy(() => {
            res.clearCookie("token");
            res.clearCookie("connect.sid");
            res.redirect("/login");
        });
    });
});

module.exports = router;
