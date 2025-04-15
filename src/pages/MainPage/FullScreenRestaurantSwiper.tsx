import { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { RestaurantProps } from "@/types/dishInterface"; // Убедитесь, что путь верный

type Props = {
  restaurants: RestaurantProps[];
};

const FullScreenSwipeRestaurants = ({ restaurants }: Props) => {
  const [index, setIndex] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setIndex((prev) => Math.min(prev + 1, restaurants.length - 1)),
    onSwipedRight: () => setIndex((prev) => Math.max(prev - 1, 0)),
    trackMouse: true,
    preventScrollOnSwipe: true,
  });

  const slideOffset = `-${index * 100}vw`; 

  return (
    // ВНЕШНИЙ КОНТЕЙНЕР - НАШ "ЭКРАН" ДЛЯ ОДНОЙ КАРТОЧКИ
    <div
      {...handlers}
      className="w-screen h-screen flex overflow-hidden bg-white select-none cursor-grab active:cursor-grabbing"
      // ^-- w-screen h-screen: Задает размер контейнера РОВНО с экран.
      // ^-- overflow-hidden: КРИТИЧЕСКИ ВАЖНО! Обрезает все, что ВЫХОДИТ за пределы этого контейнера.
      //     Именно это свойство гарантирует, что мы видим только одну карточку (или части соседних во время анимации).
    >
      {/* ОБЕРТКА ДЛЯ ВСЕХ КАРТОЧЕК - ОНА ДВИГАЕТСЯ */}
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        // ^-- flex: Располагает карточки в ряд.
        // ^-- transition-transform: Обеспечивает плавность сдвига.
        style={{ transform: `translateX(${slideOffset})` }}
        // ^-- transform: Сдвигает ВСЮ эту обертку влево/вправо.
      >
        {/* КАРТОЧКИ РЕСТОРАНОВ */}
        {restaurants.map((restaurant, i) => (
          // ИНДИВИДУАЛЬНАЯ КАРТОЧКА
          <div
            key={restaurant.id || i}
            className="w-screen h-full flex-shrink-0 flex flex-col items-center justify-center p-4 box-border"
            // ^-- w-screen: КАЖДАЯ карточка имеет ширину РОВНО с экран.
            // ^-- h-full: И высоту с экран.
            // ^-- flex-shrink-0: ЗАПРЕЩАЕТ карточке сжиматься. Она всегда будет w-screen.
          >
            {/* Контент карточки */}
            <img
              src={restaurant?.imageUrl ?? undefined}
              alt={restaurant?.name ?? "Restaurant image"}
              className="w-full max-w-md h-1/2 object-cover rounded-2xl mb-4 shadow-lg"
              draggable="false"
            />
            <h2 className="text-3xl font-bold mb-2 text-center">
              {restaurant?.name ?? "Название ресторана"}
            </h2>
            <p className="text-gray-600 text-center max-w-md">
              {restaurant?.description ?? "Описание отсутствует."}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FullScreenSwipeRestaurants;