const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const db = require("../config/db");

const secretKey = "superSecretKey";

function login (req, res){
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json(err);
        if (results.length === 0)
            return res.status(401).json({ message: "User not found" });

        const user = results[0];

        const match = await bcrypt.compare(password, user.password);
        if (!match)
            return res.status(401).json({ message: "Wrong password" });

        //  Create session
        req.session.user = {
            id: user.user_id,
            username: user.username
        };

        //  Create JWT
        const token = jwt.sign(
            { id: user.user_id, username: user.username },
            secretKey,
            { expiresIn: "1h" }
        );

        //  Send token in cookie
        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1000 * 60 * 60
        });

        res.json({ message: "Login successful" });
    });
};

function logout  (req, res)  {
    req.session.destroy(() => {
        res.clearCookie("token");
        res.json({ message: "Logged out successfully" });
    });
};
function isAuthenticated(req, res, next) {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "No token provided" });
}
module.exports = { login, logout ,isAuthenticated};