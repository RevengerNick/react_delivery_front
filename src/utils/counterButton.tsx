import { useState } from "react";
import addCart from "@/assets/buttons/addCart.svg"

type Props = {
  initialCount?: number;
}

const СounterButton = ({ initialCount = 0 }: Props) => {
  const [count, setCount] = useState(initialCount);

  return (
    initialCount !== 0 ? (
      <div className="flex items-center rounded-lg w-24 bg-gray-200 justify-between">
        <button
          className="w-full text-gray-700 rounded-l-xl hover:bg-gray-300"
          onClick={() => setCount((prev) => Math.max(1, prev - 1))}
        >
          -
        </button>
        <input
          type="number"
          className="text-center text-lg text-gray-700 font-semibold border-none outline-none w-full appearance-none [-moz-appearance:textfield]"
          value={count}
          onChange={(e) => {
            const value = parseInt(e.target.value, 10);
            setCount(isNaN(value) || value < 1 ? 1 : value);
          }}
        />
        <button
          className="w-full text-gray-700 rounded-r-xl hover:bg-gray-300"
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </button>
      </div>
    ) : (
      <div className="relative">
        <button className="absolute right-[2vw] -translate-y-12">
          <img src={addCart} alt="1" className="size-10"/>
        </button>
      </div>
    )
  );
};

export default СounterButton;