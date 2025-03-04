import { Dish} from "@/types/dishInterface";
import СounterButton from "@/utils/counterButton.tsx";

import DishPage from "@/utils/dishPage";
import { useState } from "react";

const DishCard: React.FC<
  Dish & {
    updateDish?: (updatedFields: Partial<Dish>, id?: number) => void;
    setRefresh: React.Dispatch<React.SetStateAction<number>>
  }
> = ({ updateDish, setRefresh, ...dish }) => {

  const [isDishToggled, setIsDishToggled] = useState(false)
  const maxVisibleLength = 20;
  const displayText =
    dish.name.length > maxVisibleLength
      ? dish.name.slice(0, maxVisibleLength) + "..."
      : dish.name;
  return (
    <div className="p-2 py-4 rounded-2xl shadow-md flex w-full items-center">
      <img
        src={dish.thumbnailUrl}
        alt={dish.name}
        className="ml-2 size-22 object-cover rounded-md"
      />
      <div className="w-full pl-4 relative">
        <button
          className="w-max-[20vh] whitespace-nowrap relative text-lg font-semibold hover:bg-amber-200 duration-200 rounded-2xl px-2"
          onClick={() => setIsDishToggled(true)}
        >
          {displayText}
        </button>

        <p className="text-gray-500 pb-1">Цена: {dish.price} сум</p>
        <СounterButton setRefresh={setRefresh} setDishToggled={setIsDishToggled} initialId={dish.id} dishId={dish.dishId} initialCount={dish.quantity} />
      </div>
      <div className="fixed z-40">
      <DishPage
        setRefresh={setRefresh}
        setIsDishToggled={setIsDishToggled}
        isDishToggled={isDishToggled}
        dish={dish}
        updateDish={updateDish}
      />
     
      </div>
    </div>
  );
};

export default DishCard;
