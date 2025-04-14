// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)
  const location = useLocation()

  // Allow access to update-password route even if user is logged in
  const isUpdatePasswordRoute = location.pathname.startsWith("/update-password")

  if (token === null || isUpdatePasswordRoute) {
    return children // User unauthenticated ya update-password pe hai toh page render hoga
  } else {
    return <Navigate to="/dashboard/my-profile" /> // Already logged in users ko dashboard bhej do
  }
}

export default OpenRoute
