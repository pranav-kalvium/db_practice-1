// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
  const { username, email, role } = req.body;

  if (!username || !email || !role) {
    return res.status(400).json({ message: " " });
  }

  if (!['petOwner', 'vet'].includes(role)) {
    return res.status(400).json({ message: " " });
  }

  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return res.status(400).json({ message: " " });
  }

  const newUser = new User({ username, email, role });
  await newUser.save();

  res.status(201).json({ message: "User registered! 🎉", user: newUser });
});

module.exports = router;
