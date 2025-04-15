import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { BiCurrentLocation } from "react-icons/bi"; // Импорт иконки
import { FaUtensils } from "react-icons/fa";
import { RestaurantProps } from "@/types/dishInterface";
import api from "./Static/axiosInstance";

interface UserMapProps {
  restaurants: RestaurantProps[];
}

const UserMap: React.FC<UserMapProps> = ({ restaurants }) => {
  const [initialPosition, setInitialPosition] = useState<[number, number] | null>(null);
  const [markerPosition, setMarkerPosition] = useState<[number, number, string?] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [autoZoom, setAutoZoom] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(13);
  const searchZoomLevel = 17;

  const fetchLocationName = async (lat: number, lon: number): Promise<string> => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await res.json();
      return data?.address?.city || data?.address?.town || data?.address?.village || data?.address?.state || "Неизвестно";
    } catch (e) {
      console.error("Ошибка при определении названия места:", e);
      return "Неизвестно";
    }
  };
  const confirmPosition = async () => {
    if (!markerPosition) return;
  
    const [lat, lon] = markerPosition;
  
    try {
      // Получаем адрес через Nominatim
      const { data } = await api.get("https://nominatim.openstreetmap.org/reverse", {
        params: {
          lat,
          lon,
          format: "json",
        },
      });
  
      const address = data.display_name || "Неизвестный адрес";
  
      console.log("Подтверждённая позиция:", {
        latitude: lat,
        longitude: lon,
        address,
      });
  
      // Отправляем PATCH-запрос в твой API
      await api.patch("/users/me/location", {
        address,
        latitude: lat,
        longitude: lon,
      });
  
      console.log("✅ Локация успешно обновлена");
  
    } catch (error) {
      console.error("❌ Ошибка при подтверждении позиции:", error);
    }
  };
  const MapEvents = () => {
    const map = useMapEvents({
      move: () => {
        if (!autoZoom) {
          const center = map.getCenter();
          setMarkerPosition([center.lat, center.lng]);
        }
      },
      zoom: () => {
        setAutoZoom(false);
        setZoomLevel(map.getZoom());
      },
    });

    return null;
  };

  // Центрирование карты
  const RecenterMap = ({ center, zoom }: { center: [number, number]; zoom?: number }) => {
    const map = useMap();
    useEffect(() => {
      if (autoZoom) {
        map.setView(center, zoom || map.getZoom(), { animate: true });
        setAutoZoom(false);
      }
    }, [center, zoom, autoZoom, map]);
    return null;
  };

  // Получение геолокации
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

  // Поиск по адресу
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

  // Выбор локации
  const selectLocation = (lat: string, lon: string) => {
    const newPos: [number, number] = [parseFloat(lat), parseFloat(lon)];
    setMarkerPosition(newPos);
    setAutoZoom(true);
    setZoomLevel(searchZoomLevel);
    setSearchQuery("");
    setSearchResults([]);
  };

  // Обработчик кнопки "Моё местоположение"
  const goToMyLocation = () => {
    if (initialPosition) {
      setMarkerPosition(initialPosition);
      setAutoZoom(true);
      setZoomLevel(searchZoomLevel);
    }
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
          <ul className="absolute z-30 w-full bg-white border border-gray-200 rounded-lg mt-1 max-h-60 overflow-y-auto">
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

      {/* Карта */}
      <div className="w-full h-[400px] relative z-25">
        {initialPosition ? (
          <>
            <MapContainer
              center={initialPosition}
              zoom={zoomLevel}
              className="h-full w-full "
              scrollWheelZoom={true} // Включаем зум колесиком
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {markerPosition && (
                <Marker position={[markerPosition[0], markerPosition[1]]}>
                  <Popup>Это ваше местоположение</Popup>
                </Marker>
              )}
              ({restaurants && restaurants.map((index) => (
                <Marker position={[index.latitude, index.longitude]}>
                <Popup>{index.name}</Popup>
              </Marker>
              ))})
              <MapEvents />
              {markerPosition && <RecenterMap center={[markerPosition[0], markerPosition[1]]} zoom={searchZoomLevel} />}
            </MapContainer>

            {/* Кнопка "Моё местоположение" */}
            <button
              onClick={goToMyLocation}
              className="absolute bottom-4 right-4 p-3 z-400 bg-white shadow-lg rounded-full border border-gray-300 hover:bg-gray-100"
            >
              <BiCurrentLocation size={24} className="text-gray-600" />
            </button>
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
