import { useState } from "react";
import { BiSolidCartAdd } from "react-icons/bi";
import api from "./Static/axiosInstance";
import ConfirmButton from "@/utils/ConfirmButton";
import { Dish } from "@/types/dishInterface";

type Props = {
  initialCount?: number;
  initialId?: number;
  dishId: number;
  setRefresh: React.Dispatch<React.SetStateAction<number>>
  updateDish?: (updatedFields: Partial<Dish>, id?: number) => void;
  setDishToggled: React.Dispatch<React.SetStateAction<boolean>>
  
};

const СounterButton = ({
  dishId,
  initialId,
  setRefresh,
  setDishToggled,
  updateDish,
  initialCount = 0,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(initialCount);
  const [id, setId] = useState(initialId);

  const addToCart = (dishId: any) => {
    api
      .post("/cart", { dishId: dishId, quantity: 1 })
      .then((response) => {
        if (response.status === 201) {
          setId(response.data.id);
          setCount(1); 
        }
        console.log(response.data); // Данные ответа
      })
      .catch((error) => console.error("Ошибка:", error));
  };

  const UpdateCart = (quantity: number, id?: number) => {
    const fetchData = async () => {
      api
        .patch(`/cart/${id}`, { quantity: quantity })
        .then((response) => {
          if (response.status === 200) {
            setCount(quantity);
            if (updateDish){
              updateDish({ quantity: quantity }, id);
            }
          }
        })
        .catch((error) => console.error("Ошибка:", error));
      return true;
    };
    if (quantity !== 0) {fetchData()} 
  };

  const handleConfirmAction = async () => {
    try {
      const response = await api.delete(`/cart/${id}`);
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    } finally {
      setRefresh((prev) => prev + 1);
      setDishToggled(false)
      }
  };

  return (
    <div>
      {count !== 0 ? (
        <div className="relative">
          <div className="absolute right-[2vw] -translate-y-12 flex items-center rounded-lg w-28 bg-gray-200 justify-between">
            <button
              className="w-full text-3xl text-gray-700 rounded-l-xl hover:bg-gray-300"
              onClick={() =>
                count === 1 ? setIsModalOpen(true) : UpdateCart(count - 1, id)
              }
            >
              <p className="-translate-y-0.5">-</p>
            </button>
            <input
              type="number"
              className="text-center text-2xl text-gray-700 font-semibold border-none outline-none w-full appearance-none [-moz-appearance:textfield]"
              value={count}
              onChange={(e) => {
                const value = parseInt(e.target.value, 10);
                UpdateCart(isNaN(value) || value < 1 ? 1 : value, id);
              }}
            />
            <button
              className="w-full text-3xl text-gray-700 rounded-r-xl hover:bg-gray-300"
              onClick={() => UpdateCart(count + 1, id)}
            >
              +
            </button>
          </div>
        </div>
      ) : (
        <div className="relative">
          <button
            className="absolute right-[2vw] -translate-y-12"
            onClick={() => addToCart(dishId)}
          >
            <BiSolidCartAdd className="size-12 rounded-3xl p-2 shadow-md hover:bg-amber-200 duration-150"/>
          </button>
        </div>
      )}
      <ConfirmButton
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmAction}
        message="Вы уверены, что хотите удалить блюдо?"
      />
    </div>
  );
};

export default СounterButton;
