import React from "react";
import { IconType } from "react-icons"; // Тип для иконок из react-icons

interface IconButtonProps {
  Icon: IconType; // Тип иконки
  className?: string; // Дополнительные классы (опционально)
  onClick?: () => void; // Обработчик клика (опционально)
}

const IconButton: React.FC<IconButtonProps> = ({ Icon, className = "", onClick }) => {
  return (
    <Icon
      className={`size-10 hover:bg-amber-200 duration-200 shadow-md rounded-3xl p-1 ${className}`}
      onClick={onClick}
    />
  );
};

export default IconButton;