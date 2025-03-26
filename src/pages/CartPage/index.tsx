import { useMemo, useState } from "react";
import DishCard from "@/utils/dishCard";
import { Dish } from "@/types/dishInterface";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useFetchCart from "@/utils/useFetchCart";
import Navbar from "../Navbar";
import { SelectedPage } from "@/types/SelectedPage";

const Cart = () => {
  const navigate = useNavigate();
  const [dishesCart, setDishesCart] = useState<Dish[]>([]);
  const [totalDiscount, setTotalDiscount] = useState(10);
  const [refresh, setRefresh] = useState(0);
  const [selectedPage, setSelectedPage] = useState(SelectedPage.Cart);

  const { loading, error } = useFetchCart(refresh, setDishesCart);

  const [isOpen, setIsOpen] = useState(true);

  const variants = {
    open: { height: "400px", maxHeight: "15rem" }, 
    closed: { height: "30px", maxHeight: "1.5rem" }, 
  };

  // Обработчик клика вне панели

  const updateDish = (updatedFields: Partial<Dish>, id?: number) => {
    setDishesCart((prevDishes) =>
      prevDishes.map((dish) =>
        dish.id === id ? { ...dish, ...updatedFields } : dish
      )
    );
    //setRefresh((prev) => prev + 1);
  };

  const writeDishes = () => {
    if (! dishesCart) return null; // Если данных ещё нет
    return dishesCart.map((dish, index) => (
      <motion.div
        key={dish.id}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
        className="w-full"
      >
        <DishCard {...dish} setRefresh={setRefresh} updateDish={updateDish}/>
      </motion.div>
    ));
  };
  // Вычисление общей стоимости с помощью useMemo

  const totalCost = useMemo(() => {
    return dishesCart.reduce(
      (total, num) => total + num.price * num.quantity,
      0
    );
  }, [dishesCart, refresh]);

  return (
    
    <div className="w-full">
    <div
      className="flex items-center min-w-60 w-full flex-col pb-2 overflow-auto"
      style={
        isOpen
          ? { height: `calc(100vh - 330px)` }
          : { height: `calc(100vh - 110px)` }
      }
    >
      {
        loading ? (
          <div className="flex flex-col justify-center items-center h-32">
            <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
            <p>Подождите немного</p>
          </div>
        ) : error ? (
          <p className="text-red-500 p-2 text-3xl bg-amber-300 rounded-3xl m-2">Ошибка: {error}</p>
        ) : (
          dishesCart.length < 1 ? (
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
          writeDishes()
        )
      )}

      <motion.div
        variants={variants}
        className={`fixed bottom-0 w-full  bg-white text-white rounded-tl-4xl shadow-2xl overflow-hidden ${
          isOpen ? "h-[40vh] max-h-60" : "h-[4vh] max-h-6"
        }`}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <div>
          {isOpen ? (
            <div className="flex flex-col text-black text-xl p-2 font-semibold">
              <div
                className="w-full cursor-pointer p-1"
                onClick={() => setIsOpen(!isOpen)}
              >
                <div className="h-1 w-24 mx-auto bg-gray-500 rounded-full " />
              </div>
              <div className="p-2">
                <h2 className="">{`Скидка ${totalDiscount} %`}</h2>
                <h2 className="text-3xl">{`Итог ${(
                  totalCost *
                  (100 - totalDiscount) *
                  0.01
                ).toLocaleString("ru-RU")} сўм`}</h2>
                <div className="h-1 w-full my-2 mx-auto bg-gray-500 rounded-full" />
                <h2 className="pb-4">Время доставки</h2>
                <button className="w-full text-4xl p-4 bg-amber-300 rounded-2xl hover:bg-amber-200 duration-200">
                  <p>Оформить</p>
                </button>
              </div>
            </div>
          ) : (
            <div
              className="p-3 cursor-pointer"
              onClick={() => setIsOpen(!isOpen)}
            >
              <div className="h-1 w-24 mx-auto bg-gray-500 rounded-full " />
            </div>
          )}
        </div>
      </motion.div>
    </div>
    </div>
  );
};

export default Cart;
