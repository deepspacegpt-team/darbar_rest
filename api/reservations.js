const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 1. DATABASE CONNECTION LOGIC
// We use this function because Vercel functions "sleep" and "wake up".
// This prevents the server from trying to connect a thousand times.
async function connectDB() {
  if (mongoose.connection.readyState >= 1) return; // Already connected
  
  const mongoURI = process.env.MONGO_URI;
  if (!mongoURI) {
    throw new Error("MONGO_URI environment variable is missing!");
  }
  
  await mongoose.connect(mongoURI);
  console.log("✅ Connected to MongoDB Atlas");
}

// 2. DATA MODEL
// This defines what a "Reservation" looks like in your database
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

// Create the Model (only if it doesn't already exist to avoid errors)
const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', reservationSchema);

// 3. API ROUTES

// ROUTE 1: Save a new reservation (Called by your website form)
app.post('/api/reservations', async (req, res) => {
  try {
    await connectDB(); // Make sure we are connected to the DB first
    
    const newReservation = new Reservation(req.body);
    await newReservation.save();
    
    res.status(201).json({ 
      success: true, 
      message: 'Reservation saved successfully!' 
    });
  } catch (error) {
    console.error("Error saving reservation:", error);
    res.status(400).json({ 
      success: false, 
      error: 'Could not save reservation. Please check your inputs.' 
    });
  }
});

// ROUTE 2: Get all reservations (For MR X / The Manager)
app.get('/api/reservations', async (req, res) => {
  try {
    await connectDB();
    const bookings = await Reservation.find().sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching reservations:", error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error while fetching bookings.' 
    });
  }
});

// CRITICAL FOR VERCEL: Export the app
module.exports = app;
