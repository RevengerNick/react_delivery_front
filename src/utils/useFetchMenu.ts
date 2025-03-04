// useFetchMenu.ts
import { useState, useEffect } from "react";
import api from "./axiosInstance";
import { Dish } from "@/types/dishInterface";

interface FetchMenuState {
  data: Dish[] | null;
  loading: boolean;
  error: string | null;
}

const useFetchMenu = (
    refresh: number, 
    searchText: string,
    setFuzzySearch: React.Dispatch<React.SetStateAction<boolean>>,
    setIsSearching: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const [state, setState] = useState<FetchMenuState>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (searchText.length === 0) {
    const FetchMenuData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const cartResponse = await api.get("/cart");
        const cartItems = cartResponse.data.items.map((item: any) => ({
          id: item.id,
          dishId: item.dish.id,
          name: item.dish.name,
          description: item.dish.description,
          ingredients: JSON.parse(item.dish.ingredients),
          price: item.dish.price,
          imageUrl: import.meta.env.VITE_API_BASE + item.dish.imageUrl,
          thumbnailUrl: import.meta.env.VITE_API_BASE + item.dish.thumbnailUrl,
          category: item.dish.category,
          quantity: item.quantity,
          isAvailable: item.dish.isAvailable,
          createdAt: item.dish.createdAt,
          updatedAt: item.dish.updatedAt,
          restaurantId: item.dish.restaurantId,
        }));
        const dishesResponse = await api.get("/dishes");
        const allItems = dishesResponse.data.map((dish: any) => ({
          dishId: dish.id,
          name: dish.name,
          description: dish.description,
          ingredients: JSON.parse(dish.ingredients),
          price: dish.price,
          imageUrl: import.meta.env.VITE_API_BASE + dish.imageUrl,
          thumbnailUrl: import.meta.env.VITE_API_BASE + dish.thumbnailUrl,
          category: dish.category,
          quantity: 0,
          isAvailable: dish.isAvailable,
          createdAt: dish.createdAt,
          updatedAt: dish.updatedAt,
          restaurantId: dish.restaurantId,
        }));
        const cartMap = new Map(cartItems.map((item: any) => [item.dishId, item]));

  // Заменяем элементы в allItems на соответствующие из cartItems
    const updatedAllDishes = allItems.map((dish: any) => {
    const cartDish = cartMap.get(dish.dishId);
    return cartDish ? cartDish : dish; // Если есть в корзине, берём оттуда, иначе оставляем исходный
  });
        setState({ data: updatedAllDishes, loading: false, error: null });
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
    };

    FetchMenuData();
} else {
    setIsSearching(true);
    try {
      api
        .get("dishes/search", { params: { q: searchText } })
        .then((response) => {
          const dishes = response.data.map((dish: any) => ({
            dishId: dish.id,
            name: dish.name,
            description: dish.description,
            ingredients: JSON.parse(dish.ingredients), // Преобразуем строку в массив
            price: dish.price,
            imageUrl: import.meta.env.VITE_API_BASE + dish.imageUrl,
            thumbnailUrl: import.meta.env.VITE_API_BASE + dish.thumbnailUrl,
            category: dish.category,
            isAvailable: dish.isAvailable,
            createdAt: dish.createdAt,
            updatedAt: dish.updatedAt,
            restaurantId: dish.restaurantId,
          }));
          if (response.data[0].fuzzySearch){
            setFuzzySearch(true)
          } else {
            setFuzzySearch(false)
          }
          setState({ data: dishes, loading: false, error: null });
        });
    } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }
  }
  }, [refresh, searchText]); // Зависимость от URL и параметров

  return state;
};

export default useFetchMenu;