import Line from "@/assets/buttons/line.svg";
import Menu from "@/assets/buttons/menu.svg";
import Cancel from "@/assets/buttons/cancel.svg";
import Cart from "@/assets/buttons/cart.svg";
import { motion } from "framer-motion";
import { SelectedPage } from "@/types/SelectedPage";
import { useEffect, useRef } from "react";
import { Navigate, replace, useNavigate } from "react-router-dom";

type Props = {
  selectedPage: string;
  isMenuToggled: boolean;
  setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ selectedPage, setIsMenuToggled, isMenuToggled, setSelectedPage }: Props) => {
  const navigate = useNavigate();
  const navItems: { path?: any; label: SelectedPage; action?: () => void }[] = [
    { path: "/dashboard", label: SelectedPage.Main },
    { path: "/cart", label: SelectedPage.Cart },
    { path: "/history", label: SelectedPage.History },
    { path: "/discounts", label: SelectedPage.Discounts },
    { path: "/help", label: SelectedPage.Help },
    { path: "/profile", label: SelectedPage.Profile },
    { label: SelectedPage.Main, action: () => (localStorage.removeItem("accessToken"), window.location.reload()) }, // "Выйти" можно оставить любым значением из enum
  ];

  const buttonClass = "text-lg font-semibold p-4 w-full hover:bg-amber-200 active:bg-amber-400 rounded-b-2xl shadow-md duration-400";

  return (
    <div className="flex inset-0 flex-col items-center w-full p-4 text-3xl rounded-b-2xl relative bg-amber-100">
      <h2 className="relative">{selectedPage}</h2>
      <button
        type="button"
        onClick={() => (navigate("/cart", { replace: true }), setSelectedPage(SelectedPage.Cart))}
        className="absolute right-[3vw] translate-y-1"
      >
        <img src={Cart} alt="" className="size-10 " />
      </button>
      <button
        type="button"
        onClick={() => setIsMenuToggled(!isMenuToggled)}
        className="absolute left-[3vw] translate-y-1"
      >
        {!isMenuToggled ? (
          <img src={Menu} alt="" className="size-10" />
        ) : (
          <img src={Cancel} alt="" className="size-10" />
        )}
      </button>
      {isMenuToggled && (
        <div className="  overflow-auto">
          <motion.div
            className="fixed inset-0 bg-black/30 -z-10 backdrop-blur-3xs"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          ></motion.div>

          <div
            className="absolute top-[20vh] left-8 rounded-3xl shadow-2xl overflow-auto max-h-[60vh]
                     w-[35vw] min-w-[200px] bg-amber-50 text-center"
          >
            <div>
      <div className="bg-amber-100 rounded-3xl"></div>
      {navItems.map((item, index) => (
        <button
          key={index}
          className={buttonClass}
          onClick={item.path ? () => (
            navigate(item.path, { replace: true }),
            setSelectedPage(item.label),
            setIsMenuToggled(!isMenuToggled)
        ) : item.action}
        >
          {item.path ? item.label : "Выйти из аккаунта"}
        </button>
      ))}
    </div>
          </div>
        </div>
      )}
      <img className="w-45 p-1" src={Line} alt="" />
    </div>
  );
};

export default Navbar;
