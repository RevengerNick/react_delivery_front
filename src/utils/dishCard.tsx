import { Dish} from "@/types/dishInterface";
import СounterButton from "@/utils/counterButton.tsx";

import DishPage from "@/utils/dishPage";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DishCard: React.FC<
  Dish & {
    updateDish?: (updatedFields: Partial<Dish>, id?: number) => void;
    setRefresh: React.Dispatch<React.SetStateAction<number>>
  }
> = ({ updateDish, setRefresh, ...dish }) => {
  const navigate = useNavigate();
  const goToRestaurant = (restaurantId: number) => {
    navigate(`/restaurant/${restaurantId}`, { state: { from: location.pathname } });
  };

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
          className="w-max-[20vw] whitespace-nowrap relative text-lg font-semibold hover:bg-amber-200 duration-200 rounded-2xl px-2"
          onClick={() => setIsDishToggled(true)}
        >
          {displayText}
        </button>

        <p className="text-gray-500 px-2 pb-1">Цена: {dish.price} сум</p>
        <СounterButton updateDish={updateDish} setRefresh={setRefresh} setDishToggled={setIsDishToggled} initialId={dish.id} dishId={dish.dishId} initialCount={dish.quantity} />
        <button className="font-semibold w-max-[20vw] hover:bg-amber-100 rounded-xl px-2"
        onClick={() => goToRestaurant(dish.restaurantId)}
        >{`Restaurant ${dish.restaurantId}`}</button>
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
