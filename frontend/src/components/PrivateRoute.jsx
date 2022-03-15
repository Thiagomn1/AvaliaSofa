import { Navigate, Outlet } from "react-router-dom"

function PrivateRoute() {
  const loggedIn = localStorage.getItem("user")

  return loggedIn ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
