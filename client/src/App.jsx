import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Search from './pages/Search'
import Header from './components/Header'

export default function App() {
  return <BrowserRouter>
    <Header/>

    <Routes>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/search' element={<Search/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
  </BrowserRouter>
}
