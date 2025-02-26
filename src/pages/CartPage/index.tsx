import api from "@/utils/axiosInstance";
import { useEffect, useRef, useState } from "react";
import DishCard from "@/utils/dishCard";
import { Dish } from "@/types/dishInterface";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import DishPage from "@/utils/dishPage"

const Cart = () => {
  const navigate = useNavigate();
  const [dishesCart, setDishesCart] = useState<Dish[]>([]);
  const [isDishToggled, setIsDishToggled] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const variants = {
    open: { height: "40vh", maxHeight: "15rem" }, // Выезжает вверх
    closed: { height: "4vh", maxHeight: "1.5rem" }, // Уезжает вниз
  };

  // Обработчик клика вне панели
  const handleClickOutside = (e: MouseEvent) => {
    if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    api
      .get("/cart")
      .then((response) => {
        const filteredData = response.data.items.map((item: any) => ({
          id: item.dishId,
          name: item.dish.name,
          price: item.dish.price,
          imageUrl: import.meta.env.VITE_API_BASE + item.dish.imageUrl,
          quantity: item.quantity, // Добавляем поле quantо умолчанию
        }));
        setDishesCart(filteredData);
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);

  return (
    <div className="flex items-center min-w-60 w-full flex-col pb-2">
      {dishesCart.length < 1 ? (
        <div>
          <h2 className="text-center text-3xl p-4">Корзина пуста...</h2>
          <button
            className="text-lg p-2 bg-gray-50 hover:bg-amber-50 rounded-2xl"
            onClick={() => navigate("/dashboard", { replace: true })}
          >
            Давайте добавим что-нибудь
          </button>
        </div>
      ) : (
        dishesCart.map((dish) => <DishCard key={dish.id} {...dish}  setIsDishToggled={setIsDishToggled}
        isDishToggled={isDishToggled} />)
      )}

      <motion.div
        ref={panelRef}
        variants={variants}
        className={`fixed bottom-0 w-full  bg-white text-white rounded-tl-4xl shadow-2xl overflow-hidden ${
          isOpen ? "h-[40vh] max-h-60" : "h-[4vh] max-h-6"
        }`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div
          className="p-2 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)} // Клик для сворачивания/разворачивания
        >
          {isOpen ? (
            <div className="flex flex-col text-black text-xl p-2 font-semibold">
              <div className="h-1 w-24 mx-auto bg-gray-500 rounded-full " />
              <h2 className="">Скидка</h2>
              <h2 className="text-3xl">Итог</h2>
              <div className="h-1 w-full my-2 mx-auto bg-gray-500 rounded-full" />
              <h2 className="pb-4">Время доставки</h2>
              <button className="w-full text-4xl p-4 bg-amber-300 rounded-2xl hp">
                <p>Оформить</p>
              </button>
            </div>
          ) : (
            <div className="h-1 w-24 mx-auto bg-gray-500 rounded-full" /> // Полоска для захвата
          )}
        </div>
      </motion.div>
      <DishPage
        setIsDishToggled={setIsDishToggled}
        isDishToggled={isDishToggled}
      />
    </div>
  );
};

export default Cart;
