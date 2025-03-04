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
  restaurantId?: number; // Опционально
}