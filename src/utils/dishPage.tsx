import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

type Props = {
  isDishToggled: boolean;
  setIsDishToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const NavbarMenu = ({
  isDishToggled,
  setIsDishToggled
}: Props) => {
    const dishRef = useRef<HTMLDivElement>(null);
    const handleClickOutsideDish = (e: MouseEvent) => {
        if (dishRef.current && !dishRef.current.contains(e.target as Node)) {
          setIsDishToggled(false);
        }
        
      };
      useEffect(() => {
        document.addEventListener("mousedown", handleClickOutsideDish);
        return () => document.removeEventListener("mousedown", handleClickOutsideDish);
      }, []);

  return (
    <AnimatePresence>
      {isDishToggled && (
        <div className="overflow-auto w-full z-50">
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-3xs"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
             <div
             ref={dishRef}
              style={{ maxHeight: "calc(100vh - 100px)" }}
              className="absolute top-22 left-8 h-full rounded-3xl shadow-2xl overflow-auto
                     w-[70vw] min-w-[200px] bg-gray-50 text-center"
            ></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavbarMenu;
