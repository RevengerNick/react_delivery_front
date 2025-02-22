import { useEffect, useState } from "react";
import addCart from "@/assets/buttons/addCart.svg"
import api from "./axiosInstance";

type Props = {
  initialCount?: number;
  id: number;
}

const СounterButton = ({ id, initialCount = 0 }: Props) => {
  const [count, setCount] = useState(initialCount);

  const addToCart = (id: any) => {
    
    api.post("/cart", { dishId: id, quantity: 1 })
  .then((response) => {
    if (response.status === 201) { // Проверяем status
      setCount(1); // Предполагаю, что setCount обновляет состояние
    }
    console.log(response.data); // Данные ответа
  })
  .catch((error) => console.error("Ошибка:", error));
  }

  return (
    count !== 0 ? (
      <div className="flex items-center rounded-lg w-24 bg-gray-200 justify-between">
        <button
          className="w-full text-2xl text-gray-700 rounded-l-xl hover:bg-gray-300"
          onClick={() => setCount((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <input
          type="number"
          className="text-center text-lg text-gray-700 font-semibold border-none outline-none w-full appearance-none [-moz-appearance:textfield]"
          value={count}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setCount(isNaN(value) || value < 1 ? 1 : value);
          }}
        />
        <button
          className="w-full text-2xl text-gray-700 rounded-r-xl hover:bg-gray-300"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    ) : (
      <div className="relative">
        <button className="absolute right-[2vw] -translate-y-12"
          onClick={() => addToCart(id)}
        >
          
          <img src={addCart} alt="1" className="size-10"/>
        </button>
      </div>
    )
  );
};

export default СounterButton;