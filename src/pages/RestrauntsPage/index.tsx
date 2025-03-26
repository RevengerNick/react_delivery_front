import { Dish } from "@/types/dishInterface";
import DishCard from "@/utils/dishCard";
import useFetchMenu from "@/utils/useFetchMenu";
import useFetchRestaurant from "@/utils/useFetchRestaurant";
import { IoIosCart } from "react-icons/io";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ActionButton from "@/utils/actionButton"
import { IoClose } from "react-icons/io5";

type Props = {};

const RestrauntsPage = ({}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Все"
  );
  const { restaurantId } = useParams<{ restaurantId: string }>(); 
  const restaurantIdNumber = restaurantId ? Number(restaurantId) : 1;// Получаем ID из URL
  const [refresh, setRefresh] = useState(0);

  //const [restaurantDishes, setRestaurantDishes] = useState<Dish[]>([]);
  const [searchDishes, setSearchDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fuzzySearch, setFuzzySearch] = useState(false);
  const { loading, error } = useFetchRestaurant(
    refresh,
    restaurantIdNumber,
    searchText,
    setAllDishes,
    setSearchDishes,
    setFuzzySearch,
    setIsSearching
  );
  const categories = ["Все", "Популярное", "История"];
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string })?.from || "/dashboard";
  const goBack = () => {
    navigate(from); // Возвращаемся туда, откуда пришли
  };

  const writeDishes = (restaurantDishes: Dish[]) =>
    restaurantDishes?.map((dish: any) => (
      <DishCard key={dish.dishId} {...dish} setRefresh={setRefresh} />
    )) || [];
  return (
    <div>
      <div className="flex flex-col w-screen relative mb-22">
        <div className="fixed top-0 left-0 w-full bg-gray-100 z-45 shadow-md rounded-b-2xl">
          <div className="flex inset-0 flex-col items-center w-full p-4 text-3xl rounded-b-2xl relative bg-gray-100">
            <h1 className="text-3xl font-semibold mb-4 translate-y-2">
              Блюда ресторана {restaurantId}
            </h1>
              <ActionButton Icon={IoClose} className={"absolute left-[3vw] translate-y-1 size-12"} onClick={() => goBack()}/>
              <ActionButton Icon={IoIosCart} className={"absolute right-[3vw] translate-y-1 size-12"} onClick={() => navigate("/cart")}/>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-3 my-2 rounded-3xl shadow-md m-1 transition-colors ${
                selectedCategory === category
                  ? "bg-amber-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-amber-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        {loading ? <div>Загрузка...</div> : writeDishes(allDishes)}
      </div>
    </div>
  );
};

export default RestrauntsPage;
