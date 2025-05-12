// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

router.post('/appointments', async (req, res) => {
  const { petName, date, vetId, ownerId } = req.body;

  if (!petName || !date || !vetId || !ownerId) {
    return res.status(400).json({ message: "Saari details de bhai!" });
  }

  const vet = await User.findById(vetId);
  const owner = await User.findById(ownerId);

  if (!vet || vet.role !== 'vet') {
    return res.status(404).json({ message: "Vet mil nahi raha bhai!" });
  }

  if (!owner || owner.role !== 'petOwner') {
    return res.status(404).json({ message: "Pet Owner gayab hai bhai!" });
  }

  const newAppointment = new Appointment({ petName, date, vetId, ownerId });
  await newAppointment.save();

  res.status(201).json({ message: "Appointment fix ho gaya! 🐶📅", appointment: newAppointment });
});

module.exports = router;
