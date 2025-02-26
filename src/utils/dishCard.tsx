import { Dish } from "@/types/dishInterface";
import СounterButton from "@/utils/counterButton.tsx";

const DishCard: React.FC<
  Dish & {
    setIsDishToggled: React.Dispatch<React.SetStateAction<boolean>>;
    isDishToggled: boolean;
  }
> = ({
  dishId,
  id,
  name,
  price,
  imageUrl,
  quantity,
  isDishToggled,
  setIsDishToggled,
}) => {
  const maxVisibleLength = 20;
  const displayText =
    name.length > maxVisibleLength
      ? name.slice(0, maxVisibleLength) + "..."
      : name;
  return (
    <div className="p-2 py-4 rounded-2xl shadow-md flex w-full items-center">
      <img
        src={imageUrl}
        alt={name}
        className="ml-2 size-22 object-cover rounded-md"
      />
      <div className="w-full pl-4 relative">
        <button
          className="w-max-[20vh] whitespace-nowrap relative text-lg font-semibold hover:bg-amber-200 rounded-2xl px-2"
          onClick={() => setIsDishToggled(true)}
        >
          {displayText}
        </button>

        <p className="text-gray-500 pb-1">Цена: {price} сум</p>
        {/* <p className="text-gray-700">Количество: {quantity}</p> */}
        <СounterButton id={id} dishId={dishId} initialCount={quantity} />
      </div>
    </div>
  );
};

export default DishCard;
