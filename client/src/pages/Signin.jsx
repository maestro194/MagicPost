import React from 'react'

export default function Signin() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-bold my-8'>
            Sign in
        </h1>

        <form className='flex flex-col gap-6'>
            <input 
                type="text" 
                placeholder='Username'
                className='border p-3 rounded-lg'
                id='username'/>
            <input 
                type="password" 
                placeholder='Password'
                className='border p-3 rounded-lg'
                id='password'/>
            <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover: opacity-95 disabled:opacity-80'>
                Sign in
            </button>
        </form>
    </div>
  )
}
