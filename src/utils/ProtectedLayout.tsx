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
        const { name, email, role } = response.data; // Деструктуризация объекта
        localStorage.setItem(
          "profileData",
          JSON.stringify({ name, email, role })
        ); // Для кортежа
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedLayout;
