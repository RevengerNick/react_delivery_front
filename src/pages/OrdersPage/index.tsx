import React, { useEffect, useState } from 'react';
import api from '@/utils/Static/axiosInstance';

type Order = {
  id: number;
  items: { [key: string]: number };
  total: number;
  status: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    address: string;
    latitude: number;
    longitude: number;
  };
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    api
      .get('/orders')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Ошибка при загрузке заказов:', error);
      });
  }, []);

  return (
    <div className="p-4 space-y-4 pb-20">
      <h2 className="text-2xl font-bold mb-4">Список заказов</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
        >
          <p><strong>Статус:</strong> {order.status}</p>
          <p><strong>Стоимость:</strong> {order.total} сум</p>
          <p><strong>Адрес:</strong> {order.user.address}</p>
          <p><strong>Дата создания:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Последнее обновление:</strong> {new Date(order.updatedAt).toLocaleString()}</p>
          <div className="mt-2">
            <strong>Товары:</strong>
            <ul className="list-disc ml-5">
              {Object.entries(order.items).map(([itemId, quantity]) => (
                <li key={itemId}>
                  Товар #{itemId}: {quantity} шт.
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrdersPage;
