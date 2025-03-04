import React, { useState } from "react";

const QuestionTooltip: React.FC<{ text: string }> = ({ text }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Знак вопроса (SVG) */}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-gray-500 cursor-pointer"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92c-.72.73-1.17 1.33-1.17 2.83h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 2.21 4 4c0 .88-.36 1.68-.93 2.25z" />
      </svg>

      {/* Текст при наведении */}
      {isHovered && (
        <div className="absolute z-10 left-1/2 -translate-x-1/2 top-10 bg-gray-800 text-white text-sm px-2 py-1 rounded w-[40] shadow-lg">
          {text}
        </div>
      )}
    </div>
  );
};

export default QuestionTooltip;