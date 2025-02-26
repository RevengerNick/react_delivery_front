import DishCard from "@/utils/dishCard";
import { Dish } from "@/types/dishInterface";
import { useEffect, useState } from "react";
import api from "@/utils/axiosInstance";
import DishPage from "@/utils/dishPage";

const Main = () => {
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [isDishToggled, setIsDishToggled] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Параллельно загружаем данные о блюдах и корзине
        const [dishesResponse, cartResponse] = await Promise.all([
          api.get("/dishes"),
          api.get("/cart"),
        ]);

        // Форматируем данные о блюдах с dishId вместо id
        const formattedDishes = dishesResponse.data.map((dish: any) => ({
          dishId: dish.id, // Переименовываем id в dishId
          name: dish.name,
          price: dish.price,
          imageUrl: import.meta.env.VITE_API_BASE + dish.imageUrl,
          quantity: 0, // По умолчанию 0
        }));

        // Форматируем данные о корзине в Map, где ключ — dishId, значение — объект с id и quantity
        const cartMap = new Map<number, CartItem>(
          cartResponse.data.items.map((item: any) => [
            item.dishId,
            { id: item.Id, quantity: item.quantity },
          ])
        );

        interface CartItem {
          id: number; // id из корзины
          quantity: number;
        }
        const mergedDishes: Dish[] = formattedDishes.map((dish: any) => {
          const cartItem = cartMap.get(dish.dishId); // Теперь cartItem: CartItem | undefined
          return {
            ...dish,
            id: cartItem ? cartItem.id : undefined, // TypeScript знает, что id есть
            quantity: cartItem ? cartItem.quantity : 0,
          };
        });

        // Устанавливаем объединённый массив
        setAllDishes(mergedDishes);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex min-w-60 flex-col pb-2">
      {allDishes.map((dish) => (
        <DishCard
          key={dish.dishId}
          {...dish}
          setIsDishToggled={setIsDishToggled}
          isDishToggled={isDishToggled}
        />
      ))}
      <DishPage
        setIsDishToggled={setIsDishToggled}
        isDishToggled={isDishToggled}
      />
    </div>
  );
};

export default Main;
