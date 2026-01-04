const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const router = express.Router();

/**
 * REGISTER ADMIN
 * POST /api/admin/register
 */
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  const exists = await Admin.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Admin already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const admin = new Admin({
    email,
    password: hashedPassword
  });

  await admin.save();
  res.json({ message: "Admin registered successfully" });
});

/**
 * LOGIN ADMIN
 * POST /api/admin/login
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

module.exports = router;
