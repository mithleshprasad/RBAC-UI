// // src/App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import DashboardPage from './pages/DashboardPage';
// import UserManagementPage from './pages/UserManagementPage';
// // import TutorialManagementPage from './pages/TutorialManagementPage';
// import PrivateRoute from './components/PrivateRoute';
// import { getUsers, getTutorials } from './api';

// const App = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedInUser = JSON.parse(localStorage.getItem('user'));
//     setUser(loggedInUser);
//   }, []);

//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           <Route path="/login" element={<LoginPage setUser={setUser} />} />
//           <Route path="/" element={<RegisterPage />} />
//           <Route
//             path="/dashboard"
//             element={
//               <PrivateRoute user={user} allowedRoles={['admin', 'superadmin']}>
//                 <DashboardPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/users"
//             element={
//               <PrivateRoute user={user} allowedRoles={['admin', 'superadmin']}>
//                 <UserManagementPage />
//               </PrivateRoute>
//             }
//           />
//           <Route
//             path="/tutorials"
//             element={
//               <PrivateRoute user={user} allowedRoles={['user', 'admin', 'superadmin']}>
//                 {/* <TutorialManagementPage /> */}
//               </PrivateRoute>
//             }
//           />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;
// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import TutorialManagementPage from './pages/TutorialManagementPage';
import PrivateRoute from './components/PrivateRoute';
import NavigationBar from './components/Navbar';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('user'));
    setUser(loggedInUser);
   
  }, []);

  return (
    <Router>
      <NavigationBar user={user} setUser={setUser} />
      <div className="container mt-4">
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/dashboard"
            element={
                <DashboardPage />
            
            }
          />
          <Route
            path="/users"
            element={
                <UserManagementPage />
             
            }
          />
          <Route
            path="/"
            element={
                <TutorialManagementPage />
             
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
