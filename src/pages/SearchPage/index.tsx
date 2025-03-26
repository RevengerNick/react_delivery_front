import { IoChevronBackOutline } from "react-icons/io5";
import { motion } from "framer-motion";
import { FaMagic } from "react-icons/fa";

type Props = {
  searchText: string;
  isFuzzySearch: boolean;
  setIsSearchingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  changeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  writeDishes: () => React.ReactNode;
};

const SearchPage = ({
  searchText,
  changeSearch,
  isFuzzySearch,
  setIsSearchingOpen,
  writeDishes,
}: Props) => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0, filter: "blur(5px)" }} // Начальное состояние: слева, прозрачный, размытый
      animate={{ x: 0, opacity: 1, filter: "blur(0px)" }} // Появление: на месте, видимый, чёткий
      exit={{ x: -100, opacity: 0, filter: "blur(5px)" }} // Исчезновение: уходит влево, прозрачный, размытый
      transition={{ duration: 0.3, ease: "easeInOut" }} 
      className="fixed top-0 left-0 z-120 h-screen w-screen bg-gray-100 flex flex-col items-center overflow-y-auto "// Плавность 0.5s
    >
        <div className="shadow-md flex flex-col items-center rounded-2xl mb-4 w-full">
          <IoChevronBackOutline
            className="absolute left-[3vw] translate-y-5 size-12 hover:bg-amber-200 duration-200 shadow-md rounded-3xl p-1 overflow-visible"
            onClick={() => setIsSearchingOpen(false)}
          />
          <h3 className="text-4xl font-semibold text-center p-1 pt-5">Поиск</h3>
          <div className="w-[15vw] h-1 bg-black rounded-2xl mb-6"></div>
        </div>
       <div className="relative w-full flex justify-center pb-3">
        { isFuzzySearch && <div className="flex absolute -translate-y-2 items-center gap-2 bg-gray-100 rounded-md text-gray-600 text-xs">
      <FaMagic className="text-purple-500 size-3" />
      <span>Используется нечёткий поиск</span>
    </div>}
    </div>
        <input
          type="text"
          name="Search"
          placeholder="Что ищем?"
          value={searchText}
          onChange={changeSearch}
          className="p-1 w-[95vw] bg-gray-200 rounded-2xl text-center shadow-xs"
        />
        {writeDishes()}
    </motion.div>
    
  );
};

export default SearchPage;
