import { SelectedPage } from "@/types/SelectedPage";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

type Props = {
  isMenuToggled: boolean;
  setSelectedPage: React.Dispatch<React.SetStateAction<SelectedPage>>;
  setIsMenuToggled: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: { path?: any; label: SelectedPage; action?: () => void }[];
};

const NavbarMenu = ({
  navItems,
  isMenuToggled,
  setSelectedPage,
  setIsMenuToggled,
}: Props) => {
  const navigate = useNavigate();

  const buttonClass =
    "text-lg font-semibold p-2 py-2 hover:bg-gray-200 w-[40vw] active:bg-gray-400 rounded-2xl duration-400";

  return (
    <AnimatePresence>
      {isMenuToggled && (
        <div className="  overflow-auto">
          <motion.div
            className="fixed inset-0 bg-black/30 -z-10 backdrop-blur-3xs"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(10px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
          >
            <div
              style={{ maxHeight: "calc(100vh - 100px)" }}
              className="absolute top-22 left-8 h-full rounded-3xl shadow-2xl overflow-auto
                     w-[70vw] min-w-[200px] bg-gray-50 text-center"
            >
              <div className="flex flex-col items-center">
                <div className="flex h-30 items-center"></div>
                <div className=" bg-gray-100 rounded-3xl"></div>
                {navItems.map((item, index) => (
                  <button
                    key={index}
                    className={buttonClass}
                    onClick={
                      item.path
                        ? () => (
                            navigate(item.path, { replace: true }),
                            setSelectedPage(item.label),
                            setIsMenuToggled(!isMenuToggled)
                          )
                        : item.action
                    }
                  >
                    {item.path ? item.label : "Выйти из аккаунта"}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default NavbarMenu;
