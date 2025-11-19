import React from 'react'
import { Navigate } from 'react-router-dom'

function PublicRoute({children}) {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (token && role) {
        if (role?.toLowerCase() === "admin") {
           return <Navigate to="/admindashboard" replace/>
        }
        else if (role?.toLowerCase() === "user") {
           return <Navigate to="/dashboard" replace/>
        }
    }
  return children;
}

export default PublicRoute
