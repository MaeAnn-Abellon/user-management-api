require('dotenv').config();

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

const authRoutes = require("./routes/authRoutes");
    app.use("/api/auth", authRoutes);
   
const userRoutes = require("./routes/userRoutes");
    app.use("/api/users", userRoutes);
    