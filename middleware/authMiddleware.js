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
