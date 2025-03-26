import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const UserMap = () => {
  const [initialPosition, setInitialPosition] = useState<[number, number] | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const searchZoomLevel = 15; // Настраиваемый уровень зума при поиске

  // Компонент для отслеживания перемещения карты
  const MapEvents = () => {
    const map = useMapEvents({
      move: () => {
        const center = map.getCenter();
        setMarkerPosition([center.lat, center.lng]);
      },
    });
    return null;
  };

  // Компонент для центрирования и зума карты
  const RecenterMap = ({ center, zoom }: { center: [number, number]; zoom?: number }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center, zoom || map.getZoom()); // Устанавливаем центр и зум (если указан)
    }, [center, zoom, map]);
    return null;
  };

  // Начальная геолокация
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Геолокация не поддерживается браузером");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const newPos: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setInitialPosition(newPos);
        setMarkerPosition(newPos);
      },
      (error) => console.error("Ошибка при получении геолокации:", error)
    );
  }, []);

  // Поиск по адресу через Nominatim API
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      return;
    }
    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json&limit=5`
        );
        setSearchResults(response.data);
      } catch (error) {
        console.error("Ошибка поиска:", error);
      }
    };
    fetchLocations();
  }, [searchQuery]);

  // Подтверждение позиции
  const confirmPosition = () => {
    if (markerPosition) {
      console.log("Подтверждённая позиция:", markerPosition);
    }
  };

  // Выбор локации из списка
  const selectLocation = (lat: string, lon: string) => {
    const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
    setMarkerPosition(newPos); // Обновляем маркер
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      {/* Строка поиска */}
      <div className="relative w-full max-w-md mx-auto mt-4">
        <input
          type="text"
          placeholder="Введите адрес..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500"
        />
        {searchResults.length > 0 && (
          <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <li
                key={result.place_id}
                onClick={() => selectLocation(result.lat, result.lon)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {result.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Карта и кнопка */}
      <div className="w-full h-[400px] relative z-30">
        {initialPosition ? (
          <>
            <MapContainer
              center={initialPosition}
              zoom={13}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerPosition && (
                <Marker position={markerPosition}>
                  <Popup>Это ваше местоположение</Popup>
                </Marker>
              )}
              <MapEvents /> {/* Отслеживаем перемещение */}
              {markerPosition && <RecenterMap center={markerPosition} zoom={searchZoomLevel} />} {/* Центрируем и зумим */}
            </MapContainer>
            <button
              onClick={confirmPosition}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white z-400 rounded-lg shadow-md hover:bg-blue-600"
            >
              Подтвердить
            </button>
          </>
        ) : (
          <p>Определение местоположения...</p>
        )}
      </div>
    </div>
  );
};

export default UserMap;