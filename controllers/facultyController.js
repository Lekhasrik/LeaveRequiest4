const Faculty = require('../models/Faculty');

// @desc    Get all faculty
// @route   GET /api/faculty
// @access  Public
exports.getAllFaculty = async (req, res) => {
  try {
    const faculty = await Faculty.find().sort({ createdAt: -1 });
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create new faculty
// @route   POST /api/faculty
// @access  Public
exports.createFaculty = async (req, res) => {
  try {
    const { name, email, department, isAdmin } = req.body;
    
    const faculty = new Faculty({
      name,
      email,
      department,
      isAdmin: isAdmin || false
    });

    await faculty.save();
    res.status(201).json(faculty);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get single faculty
// @route   GET /api/faculty/:id
// @access  Public
exports.getFacultyById = async (req, res) => {
  try {
    const faculty = await Faculty.findById(req.params.id);
    if (!faculty) {
      return res.status(404).json({ error: 'Faculty not found' });
    }
    res.status(200).json(faculty);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};