const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// GET all students
router.get('/', studentController.getAllStudents);

// POST create new student
router.post('/', studentController.createStudent);

// GET single student
router.get('/:id', studentController.getStudentById);

module.exports = router;