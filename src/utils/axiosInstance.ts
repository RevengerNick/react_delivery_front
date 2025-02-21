import axios from "axios";

const api = axios.create({
  
  baseURL: import.meta.env.VITE_API_BASE, // Замени на свой API
  headers: {
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
  },
});


// api.interceptors.response.use(
//   (response) => response, // Если ответ успешный, просто возвращаем его
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       console.log("Ошибка 401: Токен недействителен. Удаляем из localStorage.");
//       localStorage.removeItem("accessToken"); // Удаляем токен
//       window.location.href = "/login"; // Перенаправляем на страницу входа
//     }
//     return Promise.reject(error);
//   }
// );

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
