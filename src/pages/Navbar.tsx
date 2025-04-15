
import { SelectedPage } from "@/types/SelectedPage";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmButton from "@/utils/ConfirmButton";
import api from "@/utils/Static/axiosInstance";
import NavbarMenu from "./NavbarMenu";
import { IoIosCart } from "react-icons/io";
import { IoClose, IoTrash } from "react-icons/io5";
import { MdMenuOpen } from "react-icons/md";

type Props = {
};

const Navbar = ({
}: Props) => {
  const [selectedPage, setSelectedPage] = useState(SelectedPage.Main);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  useEffect(() => {
    if (isMenuToggled) {
      document.body.style.overflow = "hidden"; // Запрещаем скролл
    } else {
      document.body.style.overflow = ""; // Разрешаем обратно
    }
  }, [isMenuToggled]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTrashOpen, setIsTrashOpen] = useState(false);

  const location = useLocation();

  const isCartPage = location.pathname === "/cart";

  const handleCartClick = () => {
    navigate("/cart", { replace: true });
    setSelectedPage(SelectedPage.Cart);
  };

  const handleTrashClick = () => {
    setIsTrashOpen(true);
  };

  const handleConfirmDeleteCart = () => {
    api.delete("/cart").then((response) => {
      if (response.status === 200) {
        window.location.reload();
      }
      console.log(response.data);
    });
  };

  const handleConfirmAction = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const navigate = useNavigate();
  const navItems: { path?: any; label: SelectedPage; action?: () => void }[] = [
    { path: "/discounts", label: SelectedPage.Discounts },
    { path: "/help", label: SelectedPage.Help },
    { path: "/addresses", label: SelectedPage.Addresses },
    { path: "/profile", label: SelectedPage.Profile },
    { label: SelectedPage.Main, action: () => setIsModalOpen(true) }, // "Выйти" можно оставить любым значением из enum
  ];

  useEffect(() => {
    const currentItem = navItems.find(
      (item) => item.path === location.pathname
    );
    if (currentItem) {
      setSelectedPage(currentItem.label);
    }
  }, []);

  return (
    <div className="flex flex-col items-center bg-gray-100 w-screen min-h-screen min-w-screen">
      <div className="flex flex-col w-screen relative z-50">
        {/* Navbar */}
        <NavbarMenu
        
              setIsMenuToggled={setIsMenuToggled}
              setSelectedPage={setSelectedPage}
              isMenuToggled={isMenuToggled}
              navItems={navItems}
            />
        
      </div>
      <Outlet/>
    </div>
  );
};

export default Navbar;
