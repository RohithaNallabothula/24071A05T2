const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    if (!authHeader) {
        return res.status(401).json({ msg: "No token, authorization denied" });
    }

    try {
        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ msg: "Invalid token format" });
        }

        const decoded = jwt.verify(token, "secretkey");

        req.user = decoded;

        next();
    } catch (err) {
        res.status(401).json({ msg: "Invalid token" });
    }
};

module.exports = authMiddleware;