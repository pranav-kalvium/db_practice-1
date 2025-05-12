// routes/appointmentRoutes.js
const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');
const User = require('../models/User');

router.post('/appointments', async (req, res) => {
  const { petName, date, vetId, ownerId } = req.body;

  if (!petName || !date || !vetId || !ownerId) {
    return res.status(400).json({ message: " " });
  }

  const vet = await User.findById(vetId);
  const owner = await User.findById(ownerId);

  if (!vet || vet.role !== 'vet') {
    return res.status(404).json({ message: " " });
  }

  if (!owner || owner.role !== 'petOwner') {
    return res.status(404).json({ message: " " });
  }

  const newAppointment = new Appointment({ petName, date, vetId, ownerId });
  await newAppointment.save();

  res.status(201).json({ message: "Appointment fixed", appointment: newAppointment });
});

module.exports = router;
