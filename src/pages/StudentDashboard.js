

import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  CircularProgress,
  Alert,
  Box
} from '@mui/material';
import LeaveForm from '../components/LeaveForm';
import LeaveList from '../components/LeaveList';
import { getStudentLeaves } from '../services/api';

const StudentDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Replace this with actual student ID from your authentication system
  // This should come from props, context, or your auth state
  const studentId = '65d25f1a5f1d2a3e8f7e1b2c'; // Example valid MongoDB ObjectId

  // src/pages/StudentDashboard.js
useEffect(() => {
  const fetchLeaves = async () => {
    try {
      setLoading(true);
      const data = await getStudentLeaves(studentId);
      
      console.log('Received data:', data); // Add this for debugging
      
      if (!data) {
        throw new Error('No data received');
      }
      
      setLeaves(data);
      setError(null);
    } catch (err) {
      console.error('Full error details:', {
        error: err,
        response: err.response,
        studentId
      });
      
      setError(
        err.response?.data?.message || 
        'Failed to load leave data. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };
  
  fetchLeaves();
}, [studentId]);
  // Handle leave submission success
  const handleLeaveSubmitSuccess = (newLeave) => {
    setLeaves(prevLeaves => [newLeave, ...prevLeaves]);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md">
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
          <Box mt={1} fontSize="0.8rem">
            Student ID: {studentId}
          </Box>
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom sx={{ mt: 2 }}>
        Student Dashboard
      </Typography>
      
      <LeaveForm 
        studentId={studentId} 
        onSubmitSuccess={handleLeaveSubmitSuccess} 
      />
      
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        My Leave Applications
      </Typography>
      
      {leaves.length > 0 ? (
        <LeaveList leaves={leaves} />
      ) : (
        <Alert severity="info">
          No leave applications found for this student
        </Alert>
      )}
    </Container>
  );
};

export default StudentDashboard;