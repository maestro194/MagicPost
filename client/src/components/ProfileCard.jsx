import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSignOutAlt } from 'react-icons/fa'
import { signOutFailure, signOutStart, signOutSuccess } from '../redux/slice/userSlice';

export default function ProfileCard() {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSignout = async () => { 
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();

      if(data.success === false) {
        dispatch(signOutFailure(data.message));
        return;
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(data.message))
    }
  }

  return (
    <div className='w-full h-full flex flex-col p-4'>
      <div className='flex flex-row justify-between'>
        <h1 className='font-bold text-3xl pl-2'>Profile</h1>

        <button 
          onClick={handleSignout}
          className='bg-red-500 border text-white rounded-lg hover:opacity-90 p-2 flex flex-row gap-2'
        >
          <FaSignOutAlt className='my-auto mx-0.25'/>
          Sign Out
        </button>
      </div>
      
      <div className='flex justify-start gap-4 p-6'>
        <img 
          src='https://t4.ftcdn.net/jpg/05/49/98/39/360_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg' 
          className='w-40 h-40 rounded-full'
        />

        <div className='ml-2'>
          <h1 className='font-semibold text-left text-xl mb-2'>{currentUser.fullname}</h1>
          <h3 className='text-left'>{currentUser.type}</h3>
        </div>
      </div>
    </div>
  )
}
