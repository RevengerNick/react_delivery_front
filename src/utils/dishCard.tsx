type DishProps = {
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

const DishCard: React.FC<DishProps> = ({ name, price, quantity, imageUrl }) => {
  return (
    <div className="p-4 rounded-2xl shadow-md flex items-center">
      <img src={imageUrl} alt={name} className="w-20 h-20 object-cover rounded-md" />
      <div className="pl-4">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p className="text-gray-500">Цена: {price} сум</p>
        <p className="text-gray-700">Количество: {quantity}</p>
      </div>
    </div>
  );
};

export default DishCard;
