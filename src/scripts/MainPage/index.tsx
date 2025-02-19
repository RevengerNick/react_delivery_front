import api from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/shared/types";
import Navbar from "./Navbar";
import DishCard from "@/utils/dishCard";

type Props = {};

const MainPage = (props: Props) => {
  const [dishes, setDishes] = useState([]);
  const [selectedPage, setSelectedPage] = useState(SelectedPage.Main);
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const dishesGet = () => {
    api.get("/dishes").then(function (response) {
      console.log(response.data);
    });
  };

  useEffect(() => {
    api
      .get("/dishes")
      .then((response) => {
        const filteredData = response.data.map(
          ({ id, name, price, imageUrl }) => ({
            id,
            name,
            price,
            imageUrl: "http://localhost:3000" + imageUrl,
          })
        );
        setDishes(filteredData);
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  return (
    //<div className="flex justify-center flex-col items-center min-h-screen bottom-10 bg-gray-500">
    //<div className="flex flex-col bg-amber-50 relative overflow-auto">
    //<div className="sticky top-0 left-0 w-full bg-gray-100 z-10">
    <div className="flex flex-col items-center min-h-screen bg-gray-500">
      <div className="flex flex-col bg-amber-50 max-w-120 relative">
        {/* Navbar */}
        <div className="sticky top-0 left-0 w-full bg-gray-100 z-45 shadow-md rounded-b-2xl">
          <Navbar
            setIsMenuToggled={setIsMenuToggled}
            selectedPage={selectedPage}
            isMenuToggled={isMenuToggled}
          />
        </div>
        <div className="flex min-w-120 flex-col pb-2">
          {dishes.map((dish) => (
            <DishCard key={dish.id} {...dish} />
          ))}
        </div>

        <button
          type="button"
          className="bg-amber-50 hover:bg-amber-200"
          onClick={dishesGet}
        >
          Get Dishes, log
        </button>
        <button
          type="button"
          className="bg-amber-50 hover:bg-amber-200"
          onClick={() => localStorage.removeItem("accessToken")}
        >
          delete token
        </button>
      </div>
    </div>
  );
};

export default MainPage;
