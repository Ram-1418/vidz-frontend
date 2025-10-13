import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'


const MainLayout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
<Navbar toggleSidebar={()=>{}}/>
    <main className='p-4'>
        <Outlet/>
    </main>
    </div>
  )
}

export default MainLayout