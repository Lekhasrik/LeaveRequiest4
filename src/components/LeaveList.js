import React from 'react';
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, 
    TableRow, Paper, Typography, Button, Box 
  } from '@mui/material';
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   Button,
//   Box
// } from '@material-ui/core';
import StatusBadge from './StatusBadge';

const LeaveList = ({ leaves, showActions = false, onStatusChange }) => {
  if (!leaves || leaves.length === 0) {
    return (
      <Box mt={4} textAlign="center">
        <Typography variant="body1">No leave applications found</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} elevation={3} style={{ marginTop: '20px' }}>
      <Table aria-label="leave applications table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Leave Type</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Reason</TableCell>
            <TableCell>Status</TableCell>
            {showActions && <TableCell>Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {leaves.map((leave) => (
            <TableRow key={leave._id}>
              <TableCell>
                {leave.studentId?.name || 'N/A'}
                {leave.rollNumber && ` (${leave.studentId?.rollNumber})`}
              </TableCell>
              <TableCell>{leave.leaveType}</TableCell>
              <TableCell>
                {new Date(leave.startDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                {new Date(leave.endDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{leave.reason}</TableCell>
              <TableCell>
                <StatusBadge status={leave.status} />
              </TableCell>
              {showActions && (
                <TableCell>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => onStatusChange(leave._id, 'Approved')}
                    disabled={leave.status !== 'Pending'}
                    style={{ marginRight: '8px' }}
                  >
                    Approve
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => onStatusChange(leave._id, 'Rejected')}
                    disabled={leave.status !== 'Pending'}
                  >
                    Reject
                  </Button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default LeaveList;