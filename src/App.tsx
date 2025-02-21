import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthForm from "./pages/AutorizationPage/AuthForm";
import Navbar from "./pages/MainPage";
import MainPage from "./pages/MainPage/Main";
import ProtectedLayout from "./utils/ProtectedLayout";
import HistoryPage from "@/pages/HistoryPage"
import Cart from "@/pages/CartPage";
import DiscountsPage from "@/pages/DiscountsPage"
import HelpPage from "@/pages/HelpPage"
import ProfilePage from "@/pages/ProfilePage"
import AdressesPage from "@/pages/AddressesPage"

const App = () => {
  const token = localStorage.getItem("accessToken");

  return (
    <Router>
      <Routes>
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Navbar />}>
            <Route path="dashboard" element={<MainPage />} />
            <Route path="cart" element={<Cart />} />
            <Route path="history" element={<HistoryPage />} />
            <Route path="discounts" element={<DiscountsPage />} />
            <Route path="addresses" element={<AdressesPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="help" element={<HelpPage />} />
          </Route>
        </Route>
        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <AuthForm />}
        />
        {/* Страница 404 */}
        <Route path="*" element={<p>Not found</p>} />
      </Routes>
    </Router>
  );
};

export default App;
