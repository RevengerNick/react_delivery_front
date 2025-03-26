import Line from "@/assets/buttons/line.svg";
import Menu from "@/assets/buttons/menu.svg";
import Cancel from "@/assets/buttons/cancel.svg";
import Cart from "@/assets/buttons/cart.svg";
import Trash from "@/assets/buttons/trash.svg";
import { SelectedPage } from "@/types/SelectedPage";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmButton from "@/utils/ConfirmButton";
import api from "@/utils/axiosInstance";
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
    { path: "/dashboard", label: SelectedPage.Main },
    { path: "/cart", label: SelectedPage.Cart },
    { path: "/history", label: SelectedPage.History },
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
      <div className="flex flex-col w-screen relative mb-22">
        {/* Navbar */}
        <div className="fixed top-0 left-0 w-full bg-gray-100 z-45 shadow-md rounded-b-2xl">
          <div className="flex inset-0 flex-col items-center w-full p-4 rounded-b-2xl relative bg-gray-100">
            <h2 className="relative text-4xl pt-1 font-semibold">{selectedPage}</h2>
            <button
              type="button"
              onClick={isCartPage ? handleTrashClick : handleCartClick}
              className="absolute right-[3vw] translate-y-1"
            >
              {isCartPage ? <IoTrash className="size-12 hover:bg-amber-200 duration-200 shadow-md rounded-3xl p-1"/> : <IoIosCart className="size-12 hover:bg-amber-200 duration-200 shadow-md rounded-3xl p-1"/>}
            </button>
            {!isMenuToggled ? (
              <button
                type="button"
                onClick={() => setIsMenuToggled(true)}
                className="absolute left-[3vw] translate-y-1"
              >
                  <MdMenuOpen className="size-12 hover:bg-amber-200 duration-200 shadow-md rounded-3xl p-1"/>
              </button>
            ) : (
              <IoClose className="absolute left-[3vw] translate-y-1 size-12 hover:bg-amber-200 duration-200 shadow-md rounded-3xl p-1"/>
            )}

            <NavbarMenu
              setIsMenuToggled={setIsMenuToggled}
              setSelectedPage={setSelectedPage}
              isMenuToggled={isMenuToggled}
              navItems={navItems}
            />
            <div className="w-[15vw] h-1 bg-black rounded-2xl mb-2 mt-1"></div>
            <ConfirmButton
              isOpen={isTrashOpen}
              onClose={() => setIsTrashOpen(false)}
              onConfirm={handleConfirmDeleteCart}
              message="Вы уверены, что хотите очистить корзину?"
            />
            <ConfirmButton
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              onConfirm={handleConfirmAction}
              message="Вы уверены, что хотите выйти?"
            />
          </div>
        </div>
      </div>
      <Outlet/>
    </div>
  );
};

export default Navbar;
