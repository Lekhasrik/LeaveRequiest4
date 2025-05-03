import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Paper, Typography, Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
// import { 
//   TextField, 
//   Button, 
//   Select, 
//   MenuItem, 
//   FormControl, 
//   InputLabel, 
//   Paper, 
//   Typography, 
//   Grid 
// } from '@mui/material';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { applyLeave } from '../services/api';
import { showAlert } from './Alert';

const LeaveForm = ({ studentId }) => {
  const [formData, setFormData] = useState({
    studentId,
    leaveType: 'Sick',
    startDate: new Date(),
    endDate: new Date(),
    reason: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await applyLeave(formData);
      showAlert('Leave application submitted!', 'success');
      setFormData({
        ...formData,
        leaveType: 'Sick',
        reason: ''
      });
    } catch (error) {
      showAlert('Failed to submit leave', 'error');
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Paper style={{ padding: 20, marginBottom: 20 }}>
        <Typography variant="h6" gutterBottom>Apply for Leave</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Leave Type</InputLabel>
                <Select
                  value={formData.leaveType}
                  onChange={(e) => setFormData({...formData, leaveType: e.target.value})}
                  label="Leave Type"
                >
                  <MenuItem value="Sick">Sick</MenuItem>
                  <MenuItem value="Personal">Personal</MenuItem>
                  <MenuItem value="Vacation">Vacation</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="Start Date"
                value={formData.startDate}
                onChange={(date) => setFormData({...formData, startDate: date})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <DatePicker
                label="End Date"
                value={formData.endDate}
                minDate={formData.startDate}
                onChange={(date) => setFormData({...formData, endDate: date})}
                renderInput={(params) => <TextField {...params} fullWidth />}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Reason"
                multiline
                rows={4}
                fullWidth
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </LocalizationProvider>
  );
};

export default LeaveForm;
