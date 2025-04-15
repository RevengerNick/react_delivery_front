import { ProfileData } from '@/types/ProfileInterface';
import { useEffect, useState } from 'react'


const index = () => {
  const [profileData, setProfileData] = useState<ProfileData>({
    id: 0,
    name: "",
    email: "",
    role: "",
    address: "",
    latitude: undefined,
    longitude: undefined,
  });
  useEffect(() => {
  const storedData = localStorage.getItem("profileData");
  setProfileData(storedData ? JSON.parse(storedData) : null)
}, [])
  return (
    <div className='items-center p-4'>
      <h2>{"Ты " + profileData.name } </h2>
      <h2>{"Email " + profileData.email} </h2>
      <h2>{"Email " + profileData.address} </h2>
      <h2>{"Вывод: ты " + profileData.role} </h2>
    </div>
  )
}

export default index