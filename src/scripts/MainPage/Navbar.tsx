import Line from "@/assets/buttons/line.svg";
import Menu from "@/assets/buttons/menu.svg";
import Cancel from "@/assets/buttons/cancel.svg";
import { motion } from "framer-motion";
import { SelectedPage } from "@/shared/types";

type Props = {
  selectedPage: string;
  isMenuToggled: boolean;
  setSelectedPage: SelectedPage;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
};

const Navbar = ({ selectedPage, setIsMenuToggled, isMenuToggled }: Props) => {
  return (
    <div className="top-0 flex flex-col items-center w-full p-4 left-0 text-3xl rounded-b-2xl relative bg-amber-100">
      <h2 className="relative">{selectedPage}</h2>
      <button
        type="button"
        onClick={() => setIsMenuToggled(!isMenuToggled)}
        className="absolute -translate-x-50 translate-y-1"
      >
        {!isMenuToggled ? (
          <img src={Menu} alt="" className="size-10" />
        ) : (
          <img src={Cancel} alt="" className="size-10" />
        )}
      </button>
        {isMenuToggled && (
            <div className="relative">
            <motion.div 
                className="fixed inset-0 bg-black/30 -z-10 backdrop-blur-3xs"
                initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
                animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
                exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
                transition={{ duration: 0.3 }}
                ></motion.div>

              <div
                className="absolute top-16 -left-52 rounded-3xl shadow-2xl 
                    h-[80vh] w-[35vh] min-w-[200px] bg-amber-200 text-center"
              >
                <div className="min-h-34 bg-amber-100 rounded-3xl"></div>
                {Object.entries(SelectedPage).map(([key, page], index) => (
                    <div key={index} className="p-4 rounded-b-2xl shadow-md">
                        <button className="text-lg font-semibold"
                                onClick={() => console.log(key)}
                        >{page}</button>
                    </div>
                    ))}
                    <div className="p-4 rounded-b-2xl shadow-md">
                        <button className="text-lg font-semibold"
                                onClick={() => console.log()}
                        >Выйти</button>
                    </div>
                </div>
            
            </div>
          )}
      <img className="w-45 p-1" src={Line} alt="" />
    </div>
  );
};

export default Navbar;
