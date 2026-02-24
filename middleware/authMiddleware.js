// const jwt = require("jsonwebtoken");

// const secretKey = process.env.JWT_SECRET || "change_this_jwt_secret";

// exports.protect = (req, res, next) => {

//     //  Check session
//     if (!req.session.user) {
//         return res.status(401).json({ message: "No session" });
//     }

//     //  Check JWT
//     const token = req.cookies.token;
//     if (!token) {
//         return res.status(401).json({ message: "No token" });
//     }

//     try {
//         const decoded = jwt.verify(token, secretKey);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.status(403).json({ message: "Invalid token" });
//     }
// };

// exports.protectPage = (req, res, next) => {
//     if (!req.session.user || !req.cookies.token) {
//         return res.redirect("/login");
//     }

//     try {
//         const decoded = jwt.verify(req.cookies.token, secretKey);
//         req.user = decoded;
//         next();
//     } catch (err) {
//         return res.redirect("/login");
//     }
// };



exports.protectPage = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/login");
    }
    next();
};

exports.checkRole = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) {
            return res.send("Access Denied");
        }
        next();
    };
};