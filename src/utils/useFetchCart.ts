// useFetchCart.ts
import { useState, useEffect } from "react";
import api from "./axiosInstance";
import { Dish } from "@/types/dishInterface";

interface FetchCartState {
  data: Dish[] | null;
  loading: boolean;
  error: string | null;
}

const useFetchCart = (
    refresh: number, 
    setDishesCart: React.Dispatch<React.SetStateAction<Dish[]>>,
) => {
  const [state, setState] = useState<FetchCartState>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
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
        setState({ data: cartItems, loading: false, error: null });
        setDishesCart(cartItems)
      } catch (err) {
        setState({
          data: null,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
      }}
      FetchMenuData()
      
  }, [refresh]); // Зависимость от URL и параметров

  return state;
};

export default useFetchCart;