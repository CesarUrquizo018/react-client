// src/routes/PrivateRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { user } = useUser();

  return user ? <Element {...rest} /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
