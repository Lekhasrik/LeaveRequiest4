// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const connectDB = require('./config/db');

// // Connect to database
// connectDB();

// // Initialize app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/students', require('./routes/studentRoutes'));
// app.use('/api/faculty', require('./routes/facultyRoutes'));
// app.use('/api/leaves', require('./routes/leaveRoutes'));

// // Basic route
// app.get('/', (req, res) => {
//   res.send('Leave Management System API');
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Something went wrong!' });
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// process.on('unhandledRejection', (err) => {
//     console.error('Unhandled Rejection:', err);
//   });

// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Initialize app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Route imports
const studentRoutes = require('./routes/studentRoutes');
const facultyRoutes = require('./routes/facultyRoutes');
const leaveRoutes = require('./routes/leaveRoutes');

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/faculty', facultyRoutes);
//app.use('/api/leaves', leaveRoutes);
app.use('/api/leaves', leaveRoutes);
// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Available routes:`);
  console.log(`- POST /api/leaves`);
  console.log(`- GET /api/leaves/student/:studentId`);
  console.log(`- GET /api/leaves`);
  console.log(`- PUT /api/leaves/:leaveId`);
});