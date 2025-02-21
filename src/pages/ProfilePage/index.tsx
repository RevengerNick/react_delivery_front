import api from '@/utils/axiosInstance'
import { useEffect, useState } from 'react'


const index = () => {
  const [profileData, setProfileData] = useState<{email: string, name: string, role: string}>({email: "", name: "", role: ""});

  useEffect(() => {
    api.get("/users/me")
      .then((response) => {
        const { name, email, role } = response.data; // Деструктуризация объекта
        setProfileData({name, email, role}); // Для кортежа
        // или setProfileData({ name, email, role }); // Для объекта
      })
      .catch((error) => console.error("Ошибка загрузки:", error));
  }, []);
  return (
    <div className='items-center p-4'>
      <h2 className='text-center'>{"Ты " + profileData.name + " пидор\n"} </h2>
      <h2 className='text-center'>{"Email " + profileData.email + "\n"} </h2>
      <h2 className='text-center'>{"Вывод: ты " + profileData.role + " пидор"} </h2>
    </div>
  )
}

export default index