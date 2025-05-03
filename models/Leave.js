const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  facultyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Faculty'
  },
  leaveType: {
    type: String,
    required: true,
    enum: ['Sick', 'Personal', 'Vacation', 'Other']
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  status: {
    type: String,
    default: 'Pending',
    enum: ['Pending', 'Approved', 'Rejected']
  },
  comments: String
}, { timestamps: true });

module.exports = mongoose.model('Leave', LeaveSchema);