const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

// Apply for leave
router.post('/', leaveController.applyLeave);

// Get leaves for specific student
//router.get('/student/:studentId', leaveController.getStudentLeaves);
router.get('/student/:studentId', leaveController.getStudentLeaves);
// Get all leaves (for faculty view)
router.get('/', leaveController.getAllLeaves);

// Update leave status
router.put('/:leaveId', leaveController.updateLeaveStatus);

module.exports = router;