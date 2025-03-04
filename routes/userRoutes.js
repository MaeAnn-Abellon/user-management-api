const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware to check JWT
const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};

// Add User
router.post("/add", verifyToken, async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User added successfully" });
});

// Update User
router.put("/update/:id", verifyToken, async (req, res) => {
    const { name, email } = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, { name, email }, { new: true });

    res.json(user);
});

// Delete User
router.delete("/delete/:id", verifyToken, async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
});

module.exports = router;
