import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated } from "../auth";

export default function RequireAuth({ children }) {
  const location = useLocation();
  console.log("isAuthenticated?", isAuthenticated(), localStorage.getItem("access"));   
  if (!isAuthenticated()) {
    return <Navigate to="/admin-login" replace state={{ from: location }} />;
  }
  
  return children;
}