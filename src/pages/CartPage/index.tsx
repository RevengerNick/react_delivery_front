import api from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import { SelectedPage } from "@/types/SelectedPage";
import Navbar from "../Navbar";
import DishCard from "@/utils/dishCard";
import { Dish } from "@/types/dishInterface";

type Props = {

};

const Cart = ({  }: Props) => {
  const [dishesCart, setDishesCart] = useState<Dish[]>([]);

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
    <div className="flex min-w-60 flex-col pb-2">
          {dishesCart.map((dish) => (
            <DishCard key={dish.id} {...dish} />
          ))}
        </div>
  );
};

export default Cart;
