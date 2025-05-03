import React from 'react';
import { Chip } from '@mui/material';

const StatusBadge = ({ status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'Approved':
        return { color: 'primary', label: 'Approved' };
      case 'Rejected':
        return { color: 'secondary', label: 'Rejected' };
      default:
        return { color: 'default', label: 'Pending' };
    }
  };

  const { color, label } = getStatusColor();

  return (
    <Chip
      label={label}
      color={color}
      size="small"
      style={{ fontWeight: 'bold' }}
    />
  );
};

export default StatusBadge;