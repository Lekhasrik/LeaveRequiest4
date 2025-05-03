import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Snackbar, Alert as MuiAlert } from '@mui/material';
export const showAlert = (message, type = 'info') => {
  switch (type) {
    case 'success': toast.success(message); break;
    case 'error': toast.error(message); break;
    case 'warning': toast.warning(message); break;
    default: toast.info(message);
  }
};

export default function Alert() {
  return <ToastContainer position="top-right" autoClose={3000} />;
}