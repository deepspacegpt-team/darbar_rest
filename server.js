const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors()); // Allows your HTML file to talk to this server
app.use(express.json()); // Allows server to read JSON data

// 1. DATABASE CONNECTION
// Replace the URL below with your MongoDB Atlas connection string
// Replace the string below with your ACTUAL username and password
const mongoURI = 'mongodb+srv://admin:admin123@darbarcluster.djfenya.mongodb.net/darbar_db?retryWrites=true&w=majority';


mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// 2. DATA MODEL (What a reservation looks like)
const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  message: String,
  createdAt: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

// 3. API ROUTES

// Route to SAVE a reservation
app.post('/api/reservations', async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    res.status(201).json({ message: 'Reservation saved successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Error saving reservation' });
  }
});

// Route to GET all reservations (For MR X / Manager)
app.get('/api/reservations', async (req, res) => {
  try {
    const bookings = await Reservation.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching bookings' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
