import React from 'react'
import Register from './Component/Register'
import { Route, Routes } from 'react-router-dom'
import Login from './Component/Login'
import Home from './Component/Home'
import Post from './Component/Post'
import ProductLoginandRegister from './Component/protecter/ProductLoginandRegister'
import ProtectedRoute from './Component/protecter/ProtectedRoute'
import Profile from './Component/Profile'


function App() {
  return (
   <>
   
  <Routes>
    <Route element={<ProductLoginandRegister/>}>
    <Route path='/' element={<Register/>}/>
    <Route path='/login' element={<Login/>}/>
    </Route>
     
    <Route element={<ProtectedRoute />}>
    <Route path='/home' element={<Home/>}/>
    <Route path='/post' element={<Post/>}/>
    <Route path='/profile' element={<Profile/>}/>
    </Route>
   
  </Routes>
   </>
  )
}

export default App