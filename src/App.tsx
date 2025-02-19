import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AuthForm from "./scripts/AuthForm";
import Profile from "./scripts/Profile";
import ProtectedLayout from "./utils/ProtectedLayout";

const App = () => {
  //const [accessToken, setAccessToken] = useState<string>()

  const token = ""//localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        {/* Если пользователь НЕ авторизован, показываем AuthForm в любом случае */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Profile />} />
          <Route path="/dashboard" element={<Profile />} />
        </Route>

        {/* Страница 404 */}
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </Router>
  );
};

export default App;
