import React from 'react'
import { Navigate } from 'react-router-dom'

function Protected({children, user}) {
  return user ? children : <Navigate to="/" />
}

export default Protected