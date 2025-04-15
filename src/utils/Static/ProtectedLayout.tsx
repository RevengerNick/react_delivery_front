import { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import api from "./axiosInstance";

const ProtectedLayout = () => {
  console.log("ProtectedLayout render")
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    api
      .get("/users/me")
      .then((response) => {
        const { id, name, email, role, address, latitude, longitude } = response.data;
        localStorage.setItem(
          "profileData",
          JSON.stringify({ id, name, email, role, address, latitude, longitude })
        );
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
