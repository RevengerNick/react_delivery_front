import DishCard from "@/utils/Static/dishCard";
import { useCallback, useEffect, useRef, useState } from "react";
import useFetchMenu from "@/utils/UseHooks/useFetchMenu";
import { AnimatePresence, motion } from "framer-motion";
import { VscSearch } from "react-icons/vsc";
import SearchPage from "@/pages/SearchPage";
import { Dish } from "@/types/dishInterface";
import { FaFilter } from "react-icons/fa";
import RestaurantCard from "@/utils/Static/RestaurantCard";
import FullScreenSwipeRestaurants from "./FullScreenRestaurantSwiper";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    "Все"
  );
  const [fuzzySearch, setFuzzySearch] = useState(false);
  const [isSearchingOpen, setIsSearchingOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [searchDishes, setSearchDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const categories = [
    "Все",
    "Рестораны",
    "Бургеры",
    "Пицца",
    "Салаты",
    "Напитки",
  ];

  const { RestaurantList, loading, error } = useFetchMenu(
    refresh,
    searchText,
    setAllDishes,
    setSearchDishes,
    setFuzzySearch,
    setIsSearchingOpen
  );

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const writeDishes = (dishes: Dish[] | null) => {
    if (!dishes) return null;
    if (selectedCategory == "Рестораны") {
      {
        return RestaurantList.map((restaurant) => (
          <div>
            <RestaurantCard key={restaurant.id} {...restaurant} />
          </div>
        ));
      }
    } else {
      return dishes.map((dish, index) => (
        
        <motion.div
          key={dish.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
          className="w-full"
        >
          <DishCard {...dish} setRefresh={setRefresh} />
        </motion.div>
      ));
    }
  };

  const [isSnapEnabled, setIsSnapEnabled] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null); // Пример твоего state

  // УПРОЩЕННЫЙ обработчик события скролла
  const handleScroll = useCallback(() => {
      const screenHeight = window.innerHeight;
      // Небольшой буфер (например, 10 пикселей), чтобы избежать резкого переключения на самой границе
      const buffer = 10;
      if (window.scrollY >= screenHeight - buffer) {
          if (isSnapEnabled) {
              setIsSnapEnabled(false);
          }
      }
      else {
          if (!isSnapEnabled) {
              setIsSnapEnabled(true);
          }
      }
  }, [isSnapEnabled]); 
  useEffect(() => {
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
          window.removeEventListener('scroll', handleScroll);
          // console.log("Scroll listener removed.");
      };
  }, [handleScroll]);

  return (
    <div
            ref={scrollContainerRef}
            className={`h-screen w-full overflow-y-scroll ${
                // Переключаем mandatory / none в зависимости от state
                isSnapEnabled ? '[scroll-snap-type:y_mandatory]' : '[scroll-snap-type:none]'
            }`}
        >
      <div
                 className={`h-screen w-full ${isSnapEnabled ? '[scroll-snap-align:start]' : ''} [scroll-snap-stop:always]`}
             >
        <FullScreenSwipeRestaurants restaurants={RestaurantList}/>
      </div>
      {/* <div className="h-screen w-full [scroll-snap-align:start] overflow-y-scroll flex flex-col bg-gray-100"> ИЗМЕНЕНО */}
      <div
                className={`w-full ${isSnapEnabled ? '[scroll-snap-align:start]' : ''} flex flex-col items-center bg-gray-100 min-h-screen`}
            >
      <header className="w-full bg-orange-500 text-white p-4 py-6 flex justify-between items-center shadow-lg">
        <div>
          <p className="text-lg font-bold">Avinashi Road</p>
          <p className="text-sm">no.9, chennimalai, layout, cbe 15...</p>
        </div>
        <div className="flex gap-3">
          <VscSearch
            className="text-2xl cursor-pointer"
            onClick={() => setIsSearchingOpen(true)}
          />
          <FaFilter className="text-2xl cursor-pointer" />
        </div>
      </header>

      <AnimatePresence>
        {isSearchingOpen && (
          <SearchPage
            writeDishes={() => writeDishes(searchDishes)}
            searchText={searchText}
            isFuzzySearch={fuzzySearch}
            changeSearch={changeSearch}
            setIsSearchingOpen={setIsSearchingOpen}
          />
        )}
      </AnimatePresence>

      <div className="flex flex-wrap mt-4 p-2 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
              setRefresh((prev) => prev + 1);
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-md transition-colors ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-orange-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          <p>Подождите немного</p>
        </div>
      ) : error ? (
        <p className="text-red-500 p-2 text-xl bg-orange-300 rounded-lg m-2">
          Ошибка: {error}
        </p>
      ) : (
        <div className="p-4 w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {writeDishes(allDishes)}
        </div>
      )}

      <p className="mt-4 text-gray-600">
        Всего {allDishes && allDishes.length} блюд
      </p>
      </div>
    </div>
  );
};

export default Main;
