import React from 'react'
import { FaHome, FaUser, FaCube } from 'react-icons/fa'

export default function OfficeManager() {
  return (
    <div>
      {/* left navi */}
      <div className='flex'>
        <div className='bg-white w-16 md:w-48 h-screen overflow-hidden border'>
          <ul className='gap-4'>
            <li 
              className='flex gap-3 w-full h-12 py-3 pl-4 hover:bg-slate-100'
              onClick={() => console.log('clicked')}
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
      </div>
    </div>
  )
}
