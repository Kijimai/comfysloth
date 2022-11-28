import React from "react"
import { toast } from "react-toastify"
import { Route, Redirect } from "react-router-dom"
import { useAuth0 } from "@auth0/auth0-react"
// will remove later
import { useUserContext } from "../context/user_context"

const PrivateRoute = ({ children, ...rest }) => {
  const { myUser } = useUserContext()

  if (!myUser) {
    toast.warn(
      "You do not have permission to view this page! Please login or register to checkout your items."
    )
  }

  return (
    <Route
      {...rest}
      render={() => {
        return myUser ? children : <Redirect to="/" />
      }}
    ></Route>
  )
}
export default PrivateRoute
