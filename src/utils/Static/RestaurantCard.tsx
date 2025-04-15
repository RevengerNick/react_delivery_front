import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ ...restaurant }) => {
  const navigate = useNavigate();
  const maxVisibleLength = 20;
  const displayText =
    restaurant.name.length > maxVisibleLength
      ? restaurant.name.slice(0, maxVisibleLength) + "..."
      : restaurant.name;

  return (
    <div className="p-2 py-4 rounded-2xl shadow-md flex w-full h-full items-center">
      
      <img
        src={restaurant.imageUrl}
        alt={restaurant.name}
        className="ml-2 size-22 object-cover rounded-md"
      />
      <div className="w-full pl-4 relative">
        <button
          className="w-max-[20vw] whitespace-nowrap relative text-lg font-semibold hover:bg-amber-200 duration-200 rounded-2xl px-2"
          onClick={() => navigate(`/restaurant/${restaurant.id}`)}
        >
          {displayText}
        </button>

        <p className="text-gray-500 px-2 pb-1">
          Описание: {restaurant.description}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
