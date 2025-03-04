import DishCard from "@/utils/dishCard";
import { useState } from "react";
import QuestionTooltip from "@/utils/QuestionToolTip";
import useFetchMenu from "@/utils/useFetchMenu";
import { motion } from "framer-motion";

const Main = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [fuzzySearch, setFuzzySearch] = useState(false);
  const [refresh, setRefresh] = useState(0);

  // Используем useFetchMenu для получения данных
  const { data: allDishes, loading, error } = useFetchMenu(refresh, searchText, setFuzzySearch, setIsSearching);

  const changeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const writeDishes = () => {
    if (!allDishes) return null; // Если данных ещё нет
    return allDishes.map((dish, index) => (
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
  };

  return (
    <div className="flex min-w-60 flex-col pb-2 items-center">
      <div className="absolute translate-x-[20vw] translate-y-2">
        {fuzzySearch && (
          <QuestionTooltip text="Поиск не дал результатов, поэтому используется нечеткий поиск" />
        )}
      </div>
      <input
        type="text"
        name="Search"
        placeholder="Что ищем?"
        value={searchText}
        onChange={changeSearch}
        className="p-1 w-[95vw] bg-gray-200 rounded-2xl text-center shadow-xs"
      />

      {loading ? (
        <div className="flex flex-col justify-center items-center h-32">
          <div className="w-8 h-8 border-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          <p>Подождите немного</p>
        </div>
      ) : error ? (
        <p className="text-red-500 p-2 text-3xl bg-amber-300 rounded-3xl m-2">Ошибка: {error}</p>
      ) : (
        writeDishes()
      )}
      <p>всего {allDishes && allDishes.length} блюд</p>
    </div>
  );
};

export default Main;
