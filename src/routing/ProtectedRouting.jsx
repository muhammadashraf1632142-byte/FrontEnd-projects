import React from 'react'
import { Navigate } from 'react-router-dom';

export default function ProtectedRouting({ children }) {
    if (!localStorage.getItem("token")) {
        return <Navigate to="/login" replace />;
      }
  return (
    <>{children}</>
  )
}
