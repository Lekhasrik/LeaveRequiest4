// server/scripts/createTestData.js
require('dotenv').config();
const mongoose = require('mongoose');
const Student = require('../models/Student');
const Leave = require('../models/Leave');

async function createTestData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    // Clear existing test data if any
    await Student.deleteMany({ email: 'test@example.com' });
    await Leave.deleteMany({ studentId: '65d25f1a5f1d2a3e8f7e1b2c' });

    // Create test student
    const testStudent = new Student({
      _id: '65d25f1a5f1d2a3e8f7e1b2c',
      name: 'Test Student',
      email: 'test@example.com',
      department: 'Computer Science',
      semester: 3,
      rollNumber: 'CS123'
    });
    
    await testStudent.save();
    console.log('Test student created:', testStudent);

    // Create test leave record
    const testLeave = new Leave({
      studentId: '65d25f1a5f1d2a3e8f7e1b2c',
      leaveType: 'Sick',
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000), // 1 day later
      reason: 'Flu symptoms',
      status: 'Pending'
    });
    
    await testLeave.save();
    console.log('Test leave created:', testLeave);

    // Create a second test leave
    const testLeave2 = new Leave({
      studentId: '65d25f1a5f1d2a3e8f7e1b2c',
      leaveType: 'Personal',
      startDate: new Date(Date.now() + 86400000 * 2), // 2 days later
      endDate: new Date(Date.now() + 86400000 * 3),   // 3 days later
      reason: 'Family event',
      status: 'Approved'
    });
    
    await testLeave2.save();
    console.log('Second test leave created:', testLeave2);

  } catch (err) {
    console.error('Error creating test data:', err);
  } finally {
    mongoose.disconnect();
    process.exit(0);
  }
}

createTestData();