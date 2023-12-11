import React from 'react'
import {FaSearch} from 'react-icons/fa'

export default function SearchPackage() {
  return (
    <div className='p-3'>
        <form className='bg-slate-100 p-3 flex items-center'>
            <input 
                type="text" 
                placeholder='Search your package...'
                className='bg-transparent focus:outline-none w-24 sm:w-64'
            />
            <FaSearch className='text-slate-600'/>
        </form>
    </div>
  )
}
