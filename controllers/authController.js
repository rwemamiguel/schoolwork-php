// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const db = require("../config/db");

// const secretKey = process.env.JWT_SECRET || "change_this_jwt_secret";

// function register(req, res) {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//         return res.status(400).json({ message: "Username, email and password are required" });
//     }

//     const findSql = "SELECT id FROM users WHERE username = ? OR email = ?";
//     db.query(findSql, [username, email], async (findErr, existing) => {
//         if (findErr) return res.status(500).json({ message: "Failed to validate user" });
//         if (existing.length > 0) {
//             return res.status(409).json({ message: "Username or email already exists" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const insertSql = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
//         db.query(insertSql, [username, email, hashedPassword], (insertErr, result) => {
//             if (insertErr) return res.status(500).json({ message: "Registration failed" });
//             return res.status(201).json({
//                 message: "Registration successful",
//                 user: { id: result.insertId, username, email }
//             });
//         });
//     });
// }

// function login(req, res) {
//     const { username, password } = req.body;

//     if (!username || !password) {
//         return res.status(400).json({ message: "Username and password are required" });
//     }

//     const sql = "SELECT * FROM users WHERE username = ?";
//     db.query(sql, [username], async (err, results) => {
//         if (err) return res.status(500).json({ message: "Login failed" });
//         if (results.length === 0)
//             return res.status(401).json({ message: "User not found" });

//         const user = results[0];

//         const match = await bcrypt.compare(password, user.password);
//         if (!match)
//             return res.status(401).json({ message: "Wrong password" });

//         //  Create session
//         req.session.user = {
//             id: user.id,
//             username: user.username
//         };

//         //  Create JWT
//         const token = jwt.sign(
//             { id: user.id, username: user.username },
//             secretKey,
//             { expiresIn: "1h" }
//         );

//         //  Send token in cookie
//         res.cookie("token", token, {
//             httpOnly: true,
//             sameSite: "strict",
//             maxAge: 1000 * 60 * 60
//         });

//         res.json({ message: "Login successful" });
//     });
// }

// function logout(req, res) {
//     req.session.destroy(() => {
//         res.clearCookie("token");
//         res.json({ message: "Logged out successfully" });
//     });
// }

// module.exports = { register, login, logout };



const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");
const path = require('path');


// ================= REGISTER PAGE =================
exports.showRegister = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/register.html'));
};


// ================= LOGIN PAGE =================
exports.showLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'));
};


// ================= REGISTER =================
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `
        INSERT INTO users (username, email, password, role)
        VALUES (?, ?, ?, 'user')
    `;

    db.query(sql, [username, email, hashedPassword], (err) => {
        if (err) {
            return res.status(400).json({ message: "User already exists" });
        }

        res.status(201).json({ message: "Registration successful" });
    });
};


// ================= LOGIN =================
exports.login = (req, res) => {
    const { username, password } = req.body;

    db.query(
        "SELECT * FROM users WHERE username = ?",
        [username],
        async (err, results) => {

            if (err) return res.status(500).json({ message: err.message });
            if (results.length === 0)
                return res.status(401).json({ message: "Invalid credentials" });

            const user = results[0];
            const match = await bcrypt.compare(password, user.password);

            if (!match)
                return res.status(401).json({ message: "Invalid credentials" });

            // Save session
            req.session.user = {
                id: user.id,
                username: user.username,
                role: user.role
            };

            res.status(200).json({ message: "Login successful" });
        }
    );
};


// ================= LOGOUT =================
exports.logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};


// ================= GET CURRENT USER =================
exports.getUser = (req, res) => {
    if (!req.session.user) {
        return res.status(401).json({ message: "Not logged in" });
    }

    res.json(req.session.user);
};