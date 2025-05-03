// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import CssBaseline from '@mui/material/CssBaseline';
// import Alert from './components/Alert';
// import StudentDashboard from './pages/StudentDashboard';
// import FacultyDashboard from './pages/FacultyDashboard';
// import theme from './theme';

// function App() {
//   return (
//     <ThemeProvider theme={theme}>
//       <CssBaseline />
//       <Router>
//         <Alert />
//         <Routes>
//           <Route path="/faculty" element={<FacultyDashboard />} />
//           <Route path="/" element={<StudentDashboard />} />
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FacultyDashboard from './pages/FacultyDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Alert from './components/Alert';

function App() {
  return (
    <Router>
      <Alert />
      <Routes>
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/" element={<StudentDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;