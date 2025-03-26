import DishCard from "@/utils/dishCard";
import { useState } from "react";
import QuestionTooltip from "@/utils/QuestionToolTip";
import useFetchMenu from "@/utils/useFetchMenu";
import { AnimatePresence, motion } from "framer-motion";
import { SelectedPage } from "@/types/SelectedPage";
import Navbar from "../Navbar";
import { VscSearch } from "react-icons/vsc";
import SearchPage from "@/pages/SearchPage";
import { Dish, RestaurantProps } from "@/types/dishInterface";
import RestaurantCard from "@/utils/RestaurantCard";

const Main = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Все");
  const [isSearching, setIsSearching] = useState(false);
  const [isSearchingOpen, setIsSearchingOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fuzzySearch, setFuzzySearch] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const [searchDishes, setSearchDishes] = useState<Dish[]>([]);
  const [allDishes, setAllDishes] = useState<Dish[]>([]);
  const categories = ["Все", "Рестораны", "Бургеры", "Пицца", "Салаты", "Напитки"];

  const { RestaurantList, loading, error } = useFetchMenu( refresh, searchText, setAllDishes, setSearchDishes, setFuzzySearch, setIsSearching, );
  const [ selectedPage, setSelectedPage ] = useState( SelectedPage.Main);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  

  const writeDishes = (dishes: Dish[] | null) => {
    if (!dishes) return null; // Если данных ещё нет
    if (selectedCategory == "Рестораны") {
      if (RestaurantList) return RestaurantList.map((restaurant, index) => (
        <motion.div
          key={restaurant.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.1 }}
          className="w-full"
        >
          <RestaurantCard {...restaurant} />
        </motion.div>
      ));
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
    ))};
  };

  return (
    <div className="flex w-full flex-col pb-2 items-center">
      <div className="absolute translate-x-[20vw] translate-y-2">
      </div>
      <VscSearch onClick={() => setIsSearchingOpen(true)} style={{ right: "calc(3vw + 64px)" }} className="fixed  -translate-y-17 size-12 hover:bg-amber-200 duration-200 shadow-md z-50 rounded-3xl p-2.5 overflow-visible" />
      <AnimatePresence>
        {isSearchingOpen && <SearchPage writeDishes={() => writeDishes(searchDishes)} isFuzzySearch={fuzzySearch} searchText={searchText} changeSearch={changeSearch} setIsSearchingOpen={setIsSearchingOpen}/>}
        </AnimatePresence>
      <div className="flex flex-wrap mt-2 ">
      {categories.map((category) => (
            <button
              key={category}
              onClick={() => {setSelectedCategory(category); setRefresh((prev) => prev + 1)}}
              className={`px-4 py-3 rounded-3xl shadow-md m-1 transition-colors ${
                selectedCategory === category
                  ? "bg-amber-400 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-amber-200"
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
        <p className="text-red-500 p-2 text-3xl bg-amber-300 rounded-3xl m-2">Ошибка: {error}</p>
      ) : (
        writeDishes(allDishes)
      )}
      <p>всего {allDishes && allDishes.length} блюд</p>
    </div>
  );
};

export default Main;
