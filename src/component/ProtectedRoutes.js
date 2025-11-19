import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children,allowrole}) {
    const token = localStorage.getItem("token")
    const role = localStorage.getItem("role")

    if (!token) {
        return <Navigate to="/login" replace/>
    }
    if(allowrole){
        const allow = Array.isArray(allowrole) ? allowrole.includes(role) : role === allowrole;
        if (!allow) {
            return <Navigate to='/home' replace/>
        }

    }
  return children
}

export default ProtectedRoutes
