import Line from "@/assets/buttons/line.svg";
import Menu from "@/assets/buttons/menu.svg";
import Cancel from "@/assets/buttons/cancel.svg";
import Cart from "@/assets/buttons/cart.svg";
import Trash from "@/assets/buttons/trash.svg";
import { SelectedPage } from "@/types/SelectedPage";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmButton from "@/utils/ConfirmButton";
import api from "@/utils/axiosInstance";
import NavbarMenu from "./NavbarMenu";
import DishPage from "@/utils/dishPage";

type Props = {
  selectedPage: string;
  isMenuToggled: boolean;
  setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({
  selectedPage,
  setIsMenuToggled,
  isMenuToggled,
  setSelectedPage,
}: Props) => {
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
    <div className="flex inset-0 flex-col items-center w-full p-4 text-3xl rounded-b-2xl relative bg-gray-100">
      <h2 className="relative">{selectedPage}</h2>
      <button
        type="button"
        onClick={isCartPage ? handleTrashClick : handleCartClick}
        className="absolute right-[3vw] translate-y-1"
      >
        <img src={isCartPage ? Trash : Cart} alt="" className="size-10 pointer-events-none" />
      </button>
      {!isMenuToggled ? (
        <button
          type="button"
          onClick={() => setIsMenuToggled(true)}
          className="absolute left-[3vw] translate-y-1"
        >
          {!isMenuToggled && <img src={Menu} alt="" className="size-10 pointer-events-none" />}
        </button>
      ) : (
        <img
          src={Cancel}
          alt=""
          className="absolute left-[3vw] translate-y-1 size-10 pointer-events-none"
        />
      )}

      <NavbarMenu
        setIsMenuToggled={setIsMenuToggled}
        setSelectedPage={setSelectedPage}
        isMenuToggled={isMenuToggled}
        navItems={navItems}
      />
      <img className="w-45 p-1" src={Line} alt="" />
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
  );
};

export default Navbar;
