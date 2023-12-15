import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div>
      <h1 className='text-center font-bold text-3xl my-10'>Profile</h1>

      <div className='flex flex-col gap-4 w-1/2 mx-auto'>
        <img 
          src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' 
          className='w-40 h-40 mx-auto rounded-full'
        />
        <h2 className='font-semibold text-center'>{currentUser.fullname}</h2>
        <h3 className='text-center'>{currentUser.type}</h3>

        <button className='bg-red-500 border text-white rounded-lg hover:opacity-90 p-3'>
          Log Out
        </button>
      </div>


    </div>
  )
}
