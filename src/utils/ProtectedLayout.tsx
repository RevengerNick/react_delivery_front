import { Outlet } from "react-router-dom";
import AuthForm from "../scripts/AuthForm";

const ProtectedLayout = () => {
  const token = localStorage.getItem("accessToken");

  return token ? <Outlet /> : <AuthForm />;
};

export default ProtectedLayout;
