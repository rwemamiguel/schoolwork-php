const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET 

exports.protect = (req, res, next) => {

    //  Check session
    if (!req.session.user) {
        return res.status(401).json({ message: "No session" });
    }

    //  Check JWT
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "No token" });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
        
    }
};
exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
exports.isStaff = (req, res, next) => {
    if (req.user.role !== 'staff') {
        return res.status(403).json({ message: "Forbidden" });
    }
    next();
};
exports. authenticationToken = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) return res.redirect('/login');

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (err) {
        return res.redirect('/login');
    }
};
