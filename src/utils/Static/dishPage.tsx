import { Dish } from "@/types/dishInterface";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
//import СounterButton from "@/utils/counterButton.tsx";

type Props = {
  isDishToggled: boolean;
  setRefresh: React.Dispatch<React.SetStateAction<number>>,
  setIsDishToggled: React.Dispatch<React.SetStateAction<boolean>>;
  dish: Dish; 
  updateDish?: (updatedFields: Partial<Dish>, id?: number) => void;
};

const dishPage = ({ isDishToggled, setIsDishToggled, dish }: Props) => {
  
  const dishRef = useRef<HTMLDivElement>(null);
  const handleClickOutsideDish = (e: MouseEvent) => {
    if (dishRef.current && !dishRef.current.contains(e.target as Node)) {
      setIsDishToggled(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDish);
    return () =>
      document.removeEventListener("mousedown", handleClickOutsideDish);
  }, []);

  return (
    <AnimatePresence>
      {isDishToggled && (
        <div className="overflow-auto w-full z-50">
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-3xs" // Добавлены flex и центрирование
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <div
              ref={dishRef}
              style={{ maxHeight: "calc(100vh - 100px)" }}
              className="rounded-3xl shadow-2xl overflow-auto w-[70vw] min-h-[70vh] bg-gray-50 text-center translate-y-[6vh]" // Убран fixed, top-22, h-full
            >
              <div className="p-2">
                <img src={dish.imageUrl} alt="photoOfDish" className="rounded-2xl"/>
                <h1 className="text-2xl font-bold p-2">{dish.name}</h1>
                <h1 className="text-lg font-bold">Descritption</h1>
                <p>{dish.description}</p>
                <h1 className="text-lg font-bold">Ingredients</h1>
                <p>{dish.ingredients.join(", ")}</p>
                {/* <div className="">
                <СounterButton updateDish={updateDish} setRefresh={setRefresh} setDishToggled={setIsDishToggled} initialId={dish.id} dishId={dish.dishId} initialCount={dish.quantity} />
                </div> */}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default dishPage;
