import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AuthForm from "./scripts/AuthForm";
import MainPage from "./scripts/MainPage";
import ProtectedLayout from "./utils/ProtectedLayout";

const App = () => { 
  const token = localStorage.getItem("accessToken");
  
  return (
    <Router>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<MainPage/>} />
          <Route path="/dashboard" element={<MainPage />} />
        </Route>
        <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <AuthForm />} />
        {/* Страница 404 */}
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </Router>
  );
};

export default App;
