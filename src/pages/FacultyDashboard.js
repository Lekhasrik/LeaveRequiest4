import React, { useState, useEffect } from 'react';
// import { Container, Typography, Button, Box } from '@mui/material';
import { Container, Typography} from '@mui/material';
import LeaveList from '../components/LeaveList';
import { getAllLeaves, updateLeaveStatus } from '../services/api';
import { showAlert } from '../components/Alert';

const FacultyDashboard = () => {
  const [leaves, setLeaves] = useState([]);
  const facultyId = '456'; // Hardcoded for demo (replace with actual faculty ID)

  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const { data } = await getAllLeaves();
        setLeaves(data);
      } catch (error) {
        console.error('Error fetching leaves:', error);
      }
    };
    fetchLeaves();
  }, []);

  const handleStatusChange = async (leaveId, status) => {
    try {
      const { data } = await updateLeaveStatus(leaveId, { 
        status, 
        facultyId,
        comments: `${status} by Faculty` 
      });
      setLeaves(leaves.map(leave => leave._id === data._id ? data : leave));
      showAlert(`Leave ${status.toLowerCase()}`, 'success');
    } catch (error) {
      showAlert('Failed to update status', 'error');
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" gutterBottom>Faculty Dashboard</Typography>
      <Typography variant="h5" gutterBottom>Leave Applications</Typography>
      <LeaveList 
        leaves={leaves} 
        showActions={true} 
        onStatusChange={handleStatusChange} 
      />
    </Container>
  );
};

export default FacultyDashboard;