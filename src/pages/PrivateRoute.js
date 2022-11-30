import React from "react"
import { toast } from "react-toastify"
import { Route, Navigate } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"

const PrivateRoute = ({ children }) => {
  const { user } = useAuth0()

  if (!user) {
    toast.warn(
      "You do not have permission to view this page! Please login or register to checkout your items."
    )
    return <Navigate to="/" />
  }

  return children
}
export default PrivateRoute
