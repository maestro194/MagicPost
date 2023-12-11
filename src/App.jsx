import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Search from './pages/Search'

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path='/sign-in' element={<Signin/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  </BrowserRouter>
}
