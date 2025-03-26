export interface Dish {
  id?: number;
  dishId: number; // Переименованный id
  name: string;
  description?: string; // Опционально, если не всегда нужно
  ingredients: string[]; // Массив строк
  price: number;
  imageUrl: string;
  quantity: number;
  thumbnailUrl?: string; // Опционально
  category?: string; // Опционально
  isAvailable?: boolean; // Опционально
  createdAt?: string; // Опционально
  updatedAt?: string; // Опционально
  restaurantId: number; // Опционально
}

export interface RestaurantProps {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  description: string | null;
  imageUrl: string | null;
  thumbnailUrl: string | null;
  topImageUrl: string | null;
  createdAt: string;
  updatedAt: string;
}