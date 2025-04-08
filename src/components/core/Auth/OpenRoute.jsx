// This will prevent authenticated users from accessing this route
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"

function OpenRoute({ children }) {
  const { token } = useSelector((state) => state.auth)

  if (token === null) {
    return children // User unauthenticated hai toh Signup page render hoga
  } else {
    return <Navigate to="/dashboard/my-profile" /> // Already logged in users ko dashboard bhej do
  }
}

export default OpenRoute