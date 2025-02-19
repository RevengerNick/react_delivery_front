import { Navigate, Outlet, useLocation } from "react-router-dom";
import AuthForm from "../scripts/AuthForm";

const ProtectedLayout = () => {
  const token = localStorage.getItem("accessToken");
  console.log(token)
  if (!token) {
    return <Navigate to="/login" replace />;
  } 

  return <Outlet />;
};

export default ProtectedLayout;
