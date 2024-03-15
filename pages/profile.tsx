import Layout from '@/components/Layout'
import React, { useEffect, useState } from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image';
import axios from 'axios';

const ProfilePage = () => {
  const { data: session, status } = useSession()
  const [userLogged, setUserLogged] = useState()
  const [score, setScore] = useState(0);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);

  const fetchUser = async () => {
    try {
      const response = await axios.get("/api/game"); // Reemplaza "/api/user" con la ruta correcta de tu API
      const user = response.data; // Supongo que la información del usuario está en la propiedad "data"
      setUserLogged(user);
      console.log("Usuario obtenido:", user);
      setCurrentLevelIndex(user.currentLevel); // Establecer el nivel actual
      setScore(parseInt(user.points));
    } catch (error) {
      console.error("Error al obtesner el usuario:", error);
    }
  };

  useEffect(()=>{
    fetchUser()
  },[])
  const generateSegmentClasses = (index:number) => {
    return index < score ? "bg-green-500" : "bg-gray-300";
  };
  return (
    <Layout>
    <div className='font-myFont p-4 border h-full m-4 rounded-md shadow-md flex flex-col gap-4 '>
      <div className='flex items-center gap-2'>
        <div className='rounded-full'>
          <Image className='rounded-full w-12 h-12' src={session?.user?.image || ''} width={100} height={100} alt="Profile Picture" />
        </div>
        <h3 className=' font-bold text-white'>
          {session?.user?.name}
        </h3>
      </div>
      <div>
        <div>
          <h4>
            Level: {currentLevelIndex }
          </h4>
        </div>
        <div>
          <div className='flex '>
            {[...Array(12)].map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 shadow-md border border ${generateSegmentClasses(index)}`} 
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default ProfilePage