const Student = require('../models/Student');

// @desc    Get all students
// @route   GET /api/students
// @access  Public
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// @desc    Create new student
// @route   POST /api/students
// @access  Public
exports.createStudent = async (req, res) => {
  try {
    const { name, email, department, semester, rollNumber } = req.body;
    
    const student = new Student({
      name,
      email,
      department,
      semester,
      rollNumber
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// @desc    Get single student
// @route   GET /api/students/:id
// @access  Public
exports.getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};