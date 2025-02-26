import { useEffect, useState } from "react";
import { SelectedPage } from "@/types/SelectedPage";
import Navbar from "../Navbar";
import { Outlet } from "react-router-dom";

type Props = {};

const MainPage = (props: Props) => {
  const [selectedPage, setSelectedPage] = useState(SelectedPage.Main);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  useEffect(() => {
    if (isMenuToggled) {
      document.body.style.overflow = "hidden"; // Запрещаем скролл
    } else {
      document.body.style.overflow = ""; // Разрешаем обратно
    }
  }, [isMenuToggled]);

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen w-screen ">
      <div className="flex flex-col  w-screen relative">
        {/* Navbar */}
        <div className="sticky top-0 left-0 w-full bg-gray-100 z-45 shadow-md rounded-b-2xl">
          <Navbar
            setIsMenuToggled={setIsMenuToggled}
            isMenuToggled={isMenuToggled}
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
          />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
