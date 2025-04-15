import { SelectedPage } from "@/types/SelectedPage";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import profileDefault from "@/assets/profileDefault.svg";
import { FaMapMarkerAlt, FaShoppingCart, FaClipboardList, FaBars } from "react-icons/fa";

type Props = {
  isMenuToggled: boolean;
  setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: { path?: any; label: SelectedPage; action?: () => void }[];
};

const NavbarMenu = ({ navItems, isMenuToggled, setSelectedPage, setIsMenuToggled }: Props) => {
  const [profileData, setProfileData] = useState<{ email: string; name: string; role: string }>({
    email: "",
    name: "",
    role: "",
  });

  useEffect(() => {
    const storedData = localStorage.getItem("profileData");
    setProfileData(storedData ? JSON.parse(storedData) : null);
  }, []);

  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsMenuToggled(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const buttonClass = "w-full text-lg font-semibold p-2 py-2 hover:bg-amber-100 active:bg-gray-400 rounded-2xl duration-400";

  return (
    <>
      {/* Боковое меню */}
      <AnimatePresence>
        {isMenuToggled && (
          <motion.div className="fixed inset-0 bg-black/30 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div ref={menuRef} className="absolute top-12 left-8 h-full rounded-3xl shadow-2xl overflow-auto w-[30vw] min-w-[400px] bg-gray-50 text-center">
              <div className="flex flex-col items-center">
                <div className="flex h-30 items-center">
                  <img src={profileDefault} alt="Profile" className="size-30 p-3 " />
                  <div className="text-lg">
                    <h1>{profileData.name}</h1>
                    <p>{profileData.email}</p>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-3xl"></div>
                {navItems.map((item, index) => (
                  <button key={index} className={buttonClass} onClick={() => { navigate(item.path); setSelectedPage(item.label); setIsMenuToggled(false); }}>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Нижнее навигационное меню */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg flex justify-around py-3">
        <button onClick={() => navigate("/dashboard")} className="flex flex-col items-center text-gray-700 hover:text-amber-400">
          <FaMapMarkerAlt size={24} />
          <span>Рядом</span>
        </button>
        <button onClick={() => navigate("/cart")} className="flex flex-col items-center text-gray-700 hover:text-amber-400">
          <FaShoppingCart size={24} />
          <span>Корзина</span>
        </button>
        <button onClick={() => navigate("/orders")} className="flex flex-col items-center text-gray-700 hover:text-amber-400">
          <FaClipboardList size={24} />
          <span>Заказы</span>
        </button>
        <button onClick={() => setIsMenuToggled(true)} className="flex flex-col items-center text-gray-700 hover:text-amber-400">
          <FaBars size={24} />
          <span>Меню</span>
        </button>
      </div>
    </>
  );
};

export default NavbarMenu;
