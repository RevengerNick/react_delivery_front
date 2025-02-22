import { Dish } from "@/types/dishInterface";
import СounterButton from "@/utils/counterButton.tsx";

const DishCard: React.FC<Dish> = ({ id, name, price, imageUrl, quantity }) => {
  return (
    <div className="p-4 rounded-2xl shadow-md flex w-full items-center">
      <img
        src={imageUrl}
        alt={name}
        className="w-20 h-20 object-cover rounded-md"
      />
      <div className="w-full pl-4 relative">
        <h3 className="relative text-lg font-semibold">{name}</h3>

        <p className="text-gray-500">Цена: {price} сум</p>
        {/* <p className="text-gray-700">Количество: {quantity}</p> */}
        <СounterButton id={id} initialCount={quantity} />
      </div>
    </div>
  );
};

export default DishCard;
