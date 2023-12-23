import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import Search from './pages/Search'
import GM from './pages/GeneralManager/GM'
import Header from './components/Header'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import OfficeManager from './pages/Office/OfficeManager'
import OfficeEmployee from './pages/Office/OfficeEmployee'
import WarehouseManager from './pages/Warehouse/WarehouseManager'
import WarehouseEmployee from './pages/Warehouse/WarehouseEmployee'

export default function App() {
  return <BrowserRouter>
    <Header/>
    <Routes>
      {/* client route */}
      <Route element={<PublicRoute/>}>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>
      </Route>

      {/* company route */}
      <Route element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='gm' element={<GM/>}>
          <Route path='home' element={<GMHome/>}></Route>
          <Route path='users' element={<GMUsers/>}></Route>
          <Route path='packages' element={<GMPackages/>}></Route>
        </Route>
        <Route path='om' element={<OfficeManager/>}/>
        <Route path='oe' element={<OfficeEmployee/>}/>
        <Route path='wm' element={<WarehouseManager/>}/>
        <Route path='we' element={<WarehouseEmployee/>}/>
      </Route>
    </Routes>

  </BrowserRouter>
}
