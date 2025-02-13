import React from 'react'
import {  Navigate, Outlet } from 'react-router-dom';


const isAuthenticated=()=>{
    return localStorage.getItem('auth') ==null;
   }


function ProductLoginandRegister() {
  return (
    isAuthenticated() ? <Outlet/> : <Navigate to="/home"/>
    
  )
}

export default ProductLoginandRegister