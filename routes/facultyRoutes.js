const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

// GET all faculty
router.get('/', facultyController.getAllFaculty);

// POST create new faculty
router.post('/', facultyController.createFaculty);

// GET single faculty
router.get('/:id', facultyController.getFacultyById);

module.exports = router;