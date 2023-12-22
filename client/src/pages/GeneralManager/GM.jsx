import React from 'react'
import { FaHome, FaUser, FaCube } from 'react-icons/fa'
import ProfileCard from '../../components/ProfileCard'

export default function GM() {
  const showProfile = () => {
    console.log('clicked')
  }

  return (
    <div>
      {/* left navi */}
      <div className='flex'>
        <div className='bg-white w-16 md:w-48 h-screen overflow-hidden border'>
          <ul className='gap-4'>
            <li 
              className='flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-100'
              onClick={showProfile}
            >
              <FaHome className='m-1'/>
              <span className='hidden md:inline-flex'>Home</span>
            </li>
            <li 
              className='flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-100'
              onClick={() => console.log('clicked')}
            >
              <FaUser className='m-1'/>
              <span className='hidden md:inline-flex'>User</span>
            </li>
            <li 
              className='flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-100'
              onClick={() => console.log('clicked')}
            >
              <FaCube className='m-1'/>
              <span className='hidden md:inline-flex'>Package</span>
            </li>
          </ul>
        </div>

        {/* right content */}
        <div className='p-6 gap-4 w-full'>
          <div className='bg-white border rounded-lg'>
            <ProfileCard />
          </div>
        </div>
      </div>

    </div>
  )
}
