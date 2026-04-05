import React from 'react'
import { AuthContext } from '../backend/context/Auth';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({children}) => {
  // Here <Dashboard /> component is passed as children from App.jsx

  const { user } = React.useContext(AuthContext);
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;    // children is coming from App.jsx where <Dashboard /> component is passed as a child to RequireAuth
}

export default RequireAuth