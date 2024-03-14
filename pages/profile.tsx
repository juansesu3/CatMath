import Layout from '@/components/Layout'
import React from 'react'
import { useSession } from "next-auth/react";
import Image from 'next/image';

const ProfilePage = () => {
  const { data: session, status } = useSession()
  console.log(session)
  return (
    <Layout>
      <div className='flex'>
        <h3>
        {session?.user?.name}
        </h3>
        
        <div className='rounded-full'>
          <Image className='rounded-full w-12 h-12' src={session?.user?.image||''} width={100} height={100} alt="Profile Picture" />
        </div>
      </div>
    </Layout>
  )
}

export default ProfilePage