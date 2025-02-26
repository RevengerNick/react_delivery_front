import { useState } from "react";
import addCart from "@/assets/buttons/addCart.svg";
import api from "./axiosInstance";

type Props = {
  initialCount?: number;
  id?: number;
  dishId: number;
};

const СounterButton = ({ dishId, id, initialCount = 0 }: Props) => {
  const [count, setCount] = useState(initialCount);

  const addToCart = (dishId: any) => {
    api
      .post("/cart", { dishId: dishId, quantity: 1 })
      .then((response) => {
        if (response.status === 201) {
          id = response.data.id;
          setCount(1); // Предполагаю, что setCount обновляет состояние
        }
        console.log(response.data); // Данные ответа
      })
      .catch((error) => console.error("Ошибка:", error));
  };

  const UpdateCart = (quantity: number, id?: number) => {
    api
      .patch(`/cart/${id}`, { quantity: quantity })
      .then((response) => {
        if (response.status === 201) {
          // Проверяем status
          setCount(quantity); // Предполагаю, что setCount обновляет состояние
        }
        console.log(response.data); // Данные ответа
      })
      .catch((error) => console.error("Ошибка:", error));
  };

  return count !== 0 ? (
    <div className="flex items-center rounded-lg w-24 bg-gray-200 justify-between">
      <button
        className="w-full text-xl text-gray-700 rounded-l-xl hover:bg-gray-300"
        onClick={() => UpdateCart(Math.max(1, initialCount - 1), id)}
      >
        -
      </button>
      <input
        type="number"
        className="text-center text-lg text-gray-700 font-semibold border-none outline-none w-full appearance-none [-moz-appearance:textfield]"
        value={count}
        onChange={(e) => {
          const value = parseInt(e.target.value, 10);
          UpdateCart(isNaN(value) || value < 1 ? 1 : value, id);
        }}
      />
      <button
        className="w-full text-xl text-gray-700 rounded-r-xl hover:bg-gray-300"
        onClick={() => UpdateCart(initialCount + 1, id)}
      >
        +
      </button>
    </div>
  ) : (
    <div className="relative">
      <button
        className="absolute right-[2vw] -translate-y-12"
        onClick={() => addToCart(dishId)}
      >
        <img src={addCart} alt="1" className="size-10" />
      </button>
    </div>
  );
};

export default СounterButton;
