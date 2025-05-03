import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const applyLeave = (leaveData) => axios.post(API_URL, leaveData);
export const getStudentLeaves = async (studentId) => {
  try {
    const response = await axios.get(`${API_URL}/leaves/student/${studentId}`, {
      params: { 
        timestamp: Date.now() 
      }
    });
    return response.data;
  } catch (error) {
    console.error('API Error Details:', {
      status: error.response?.status,
      data: error.response?.data,
      studentId,
      fullError: error
    });
    throw error;
  }
};
// export const getStudentLeaves = async (studentId) => {
//     try {
//       const response = await axios.get(`${API_URL}/student/${studentId}`);
//       return response.data;
//     } catch (error) {
//       console.error('API Error:', error.response?.data || error.message);
//       throw error;
//     }
//   };
export const getAllLeaves = () => axios.get(API_URL);
export const updateLeaveStatus = (leaveId, statusData) => axios.put(`${API_URL}/${leaveId}`, statusData);