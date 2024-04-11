import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

function PrivateRoute({ element: Component, userType, ...rest }) {
  const isAuthenticated = () => {
    const token = localStorage.getItem('access-token');
    console.log('Access token:', token);
    return token !== null;
  };

  const getCurrentUserType = () => {
    const userType = localStorage.getItem('user-type');
    console.log('Current user type:', userType);
    return userType;
  };

  const currentUserType = getCurrentUserType();
  console.log('Required user type:', userType);
  console.log('Current user type:', currentUserType);

  return (
    <Routes>
      <Route
        {...rest}
        element={
          isAuthenticated() && currentUserType === userType ? (
            <Component />
          ) : (
            <Navigate to={`/${userType}/login`} />
          )
        }
      />
    </Routes>
  );
}

export default PrivateRoute;
