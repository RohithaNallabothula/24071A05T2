const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

// Dummy user (for testing)
const user = {
    id: 1,
    username: "test",
    password: "1234"
};

// Login route
router.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (username !== user.username || password !== user.password) {
        return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
        user: {
            id: user.id,
            username: user.username
        }
    };

    const token = jwt.sign(payload, "secretkey", { expiresIn: "1h" });

    res.json({ token });
});

module.exports = router;