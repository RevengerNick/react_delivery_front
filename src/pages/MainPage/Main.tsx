import DishCard from "@/utils/dishCard"
import {Dish} from "@/types/dishInterface"
import { useEffect, useState } from "react"
import api from "@/utils/axiosInstance"

const Main = () => {
  const [allDishes, setAllDishes] = useState<Dish[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Параллельно загружаем данные о блюдах и корзине
        const [dishesResponse, cartResponse] = await Promise.all([
          api.get("/dishes"),
          api.get("/cart"),
        ]);

        // Форматируем данные о блюдах
        const formattedDishes = dishesResponse.data.map((dish: any) => ({
          id: dish.id,
          name: dish.name,
          price: dish.price,
          imageUrl: import.meta.env.VITE_API_BASE + dish.imageUrl,
          quantity: 0, // Добавляем поле quantity по умолчанию
        }));

        // Форматируем данные о корзине в объект для быстрого доступа
        const cartMap = new Map(
          cartResponse.data.items.map((item: any) => [
            item.dishId, 
            item.quantity
          ])
        );

        // Объединяем: добавляем количество из корзины к блюдам
        const mergedDishes = formattedDishes.map((dish:any) => ({
          ...dish,
          quantity: cartMap.get(dish.id) || 0, // Если блюда нет в корзине, quantity = 0
        }));

        // Устанавливаем объединенный массив
        setAllDishes(mergedDishes);
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
      }
    };

    fetchData();
  }, [])

  return (
    <div className="flex min-w-60 flex-col pb-2">
          {allDishes.map((dish) => (
            <DishCard key={dish.id} {...dish} />
          ))}
        </div>
  )
}

export default Main