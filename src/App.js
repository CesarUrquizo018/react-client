// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import { UserProvider } from './context/UserContext';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CreateUserPage from './pages/CreateUserPage';
import UserPage from './pages/UserPage';
import MyProjectsPage from './pages/MyProjectsPage';
import DetailsProjectPage from './pages/DetailsProjectPage';
import RequestPage from './pages/RequestPage';  

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './index.css';
import './App.css'; 

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<CreateUserPage />} />
          <Route path="/user" element={<PrivateRoute element={UserPage} />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/myprojects" element={<PrivateRoute element={MyProjectsPage} />} />
          <Route path="/requests" element={<PrivateRoute element={RequestPage} />} /> 
          <Route path="/project-details/:id" element={<PrivateRoute element={DetailsProjectPage} />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
