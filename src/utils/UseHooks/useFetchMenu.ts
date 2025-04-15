// useFetchMenu.ts
import { useState, useEffect } from "react";
import api from "../Static/axiosInstance";
import { Dish, RestaurantProps } from "@/types/dishInterface";

interface FetchMenuState {
  RestaurantList: RestaurantProps[];
  loading: boolean;
  error: string | null;
}

const useFetchMenu = (
  refresh: number,
  searchText: string,
  setAllDishes: React.Dispatch<React.SetStateAction<Dish[]>>,
  setSearchDishes: React.Dispatch<React.SetStateAction<Dish[]>>,
  setFuzzySearch: React.Dispatch<React.SetStateAction<boolean>>,
  setIsSearching: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const [state, setState] = useState<FetchMenuState>({
    RestaurantList: [],
    loading: false,
    error: null,
  });

  useEffect(() => {
    api.get("/restaurants")
    .then((response) => {
      const restaurant: RestaurantProps[] = response.data.map((item: any) => ({
        id: item.id,
        name: item.name,
        latitude: item.latitude,
        longitude: item.longitude,
        description: item.description ?? "", // Если null, заменяем на пустую строку
        imageUrl: import.meta.env.VITE_API_BASE + (item.imageUrl ?? ""), // Если null, заменяем на пустую строку
        thumbnailUrl: import.meta.env.VITE_API_BASE + (item.thumbnailUrl ?? ""), // Если null, заменяем на пустую строку
        topImageUrl: import.meta.env.VITE_API_BASE + (item.topImageUrl ?? ""), // Если null, заменяем на пустую строку
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }));
      console.log(restaurant.map((index) => {index.imageUrl}))
      setState((prev) => ({ ...prev, RestaurantList: restaurant }));
    })
    if (searchText.length === 0) {
      const FetchMenuData = async () => {
        setState((prev) => ({ ...prev, loading: true, error: null }));
        try {
          const cartResponse = await api.get("/cart");
          let cartItems: any[] = [];

          if (cartResponse.data.items) {
            cartItems = cartResponse.data.items.map((item: any) => ({
              id: item.id,
              dishId: item.dish.id,
              name: item.dish.name,
              description: item.dish.description,
              ingredients: JSON.parse(item.dish.ingredients),
              price: item.dish.price,
              imageUrl: import.meta.env.VITE_API_BASE + item.dish.imageUrl,
              thumbnailUrl:
                import.meta.env.VITE_API_BASE + item.dish.imageUrl,
              category: item.dish.category,
              quantity: item.quantity,
              isAvailable: item.dish.isAvailable,
              createdAt: item.dish.createdAt,
              updatedAt: item.dish.updatedAt,
              restaurantId: item.dish.restaurantId,
            }));
          }
          const dishesResponse = await api.get("/dishes");
          const allItems = dishesResponse.data.map((dish: any) => ({
            dishId: dish.id,
            name: dish.name,
            description: dish.description,
            ingredients: JSON.parse(dish.ingredients),
            price: dish.price,
            imageUrl: import.meta.env.VITE_API_BASE + dish.imageUrl,
            thumbnailUrl: import.meta.env.VITE_API_BASE + dish.imageUrl, //УДАЛЕНО ПОЧЕМУ ТО dish.thumbnailUrl
            category: dish.category,
            quantity: 0,
            isAvailable: dish.isAvailable,
            createdAt: dish.createdAt,
            updatedAt: dish.updatedAt,
            restaurantId: dish.restaurantId,
          }));
          const cartMap = new Map(
            cartItems.map((item: any) => [item.dishId, item])
          );

          // Заменяем элементы в allItems на соответствующие из cartItems
          const updatedAllDishes = allItems.map((dish: any) => {
            const cartDish = cartMap.get(dish.dishId);
            return cartDish ? cartDish : dish; // Если есть в корзине, берём оттуда, иначе оставляем исходный
          });
          setAllDishes(updatedAllDishes);
          setState((prev) => ({ ...prev, loading: false, error: null }));
        } catch (err) {
          setState((prev) => ({ ...prev, loading: false,
            error: err instanceof Error ? err.message : "Unknown error", }));
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
              thumbnailUrl: import.meta.env.VITE_API_BASE + dish.imageUrl,
              category: dish.category,
              isAvailable: dish.isAvailable,
              createdAt: dish.createdAt,
              updatedAt: dish.updatedAt,
              restaurantId: dish.restaurantId,
            }));
            if (response.data[0].fuzzySearch) {
              setFuzzySearch(true);
            } else {
              setFuzzySearch(false);
            }
            setSearchDishes(dishes);
            setState((prev) => ({ ...prev, loading: false, error: null }));
          });
      } catch (err) {
        setState((prev) => ({ ...prev, loading: false,
          error: err instanceof Error ? err.message : "Unknown error", }));
      }
    }
  }, [refresh, searchText]); // Зависимость от URL и параметров

  return state;
};

export default useFetchMenu;
