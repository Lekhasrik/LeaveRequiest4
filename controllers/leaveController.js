// const Leave = require('../models/Leave');
// const Student = require('../models/Student');
// const Faculty = require('../models/Faculty');

// exports.applyLeave = async (req, res) => {
//   try {
//     const { studentId, leaveType, startDate, endDate, reason } = req.body;
    
//     const leave = new Leave({
//       studentId,
//       leaveType,
//       startDate,
//       endDate,
//       reason
//     });

//     await leave.save();
//     res.status(201).json(leave);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getStudentLeaves = async (req, res) => {
//   try {
//     const { studentId } = req.params;
//     const leaves = await Leave.find({ studentId }).populate('facultyId', 'name');
//     res.json(leaves);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// //controllers/leaveController.js
// // controllers/leaveController.js
// // const mongoose = require('mongoose');

// // exports.getStudentLeaves = async (req, res) => {
// //   try {
// //     const { studentId } = req.params;
    
// //     // Convert to ObjectId if it's a valid format, otherwise use as string
// //     const query = mongoose.Types.ObjectId.isValid(studentId) 
// //       ? { studentId: mongoose.Types.ObjectId(studentId) }
// //       : { studentId };
    
// //     const leaves = await Leave.find(query)
// //       .populate('studentId', 'name rollNumber')
// //       .populate('facultyId', 'name');
      
// //     res.json(leaves);
// //   } catch (err) {
// //     console.error('Error:', err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // };

// exports.getAllLeaves = async (req, res) => {
//   try {
//     const leaves = await Leave.find()
//       .populate('studentId', 'name rollNumber')
//       .populate('facultyId', 'name');
//     res.json(leaves);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateLeaveStatus = async (req, res) => {
//   try {
//     const { leaveId } = req.params;
//     const { status, facultyId, comments } = req.body;
    
//     const leave = await Leave.findByIdAndUpdate(
//       leaveId,
//       { status, facultyId, comments },
//       { new: true }
//     ).populate('studentId', 'name rollNumber');

//     res.json(leave);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// controllers/leaveController.js
const Leave = require('../models/Leave');
const Student = require('../models/Student');
const Faculty = require('../models/Faculty');
const mongoose = require('mongoose');

exports.applyLeave = async (req, res) => {
  try {
    const { studentId, leaveType, startDate, endDate, reason } = req.body;
    
    // Validate input
    if (!studentId || !leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const leave = new Leave({
      studentId,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      status: 'Pending'
    });

    await leave.save();
    res.status(201).json(leave);
  } catch (err) {
    res.status(400).json({ 
      error: 'Failed to apply leave',
      details: err.message 
    });
  }
};

// server/controllers/leaveController.js
exports.getStudentLeaves = async (req, res) => {
  try {
    const { studentId } = req.params;
    console.log('Fetching leaves for student:', studentId); // Add logging
    
    const leaves = await Leave.find({ studentId })
      .populate('studentId', 'name rollNumber')
      .populate('facultyId', 'name');
      
    console.log('Found leaves:', leaves.length); // Add logging
    
    res.json(leaves);
  } catch (err) {
    console.error('Error in getStudentLeaves:', err);
    res.status(500).json({ 
      message: 'Error fetching leaves',
      error: err.message 
    });
  }
};
exports.getAllLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .populate('studentId', 'name rollNumber')
      .populate('facultyId', 'name')
      .sort({ createdAt: -1 });
      
    res.json(leaves);
  } catch (err) {
    res.status(500).json({ 
      error: 'Failed to fetch all leaves',
      details: err.message 
    });
  }
};

exports.updateLeaveStatus = async (req, res) => {
  try {
    const { leaveId } = req.params;
    const { status, facultyId, comments } = req.body;

    if (!status || !facultyId) {
      return res.status(400).json({ error: 'Status and facultyId are required' });
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      leaveId,
      { status, facultyId, comments },
      { new: true }
    ).populate('studentId', 'name rollNumber');

    if (!updatedLeave) {
      return res.status(404).json({ error: 'Leave not found' });
    }

    res.json(updatedLeave);
  } catch (err) {
    res.status(400).json({ 
      error: 'Failed to update leave status',
      details: err.message 
    });
  }
};