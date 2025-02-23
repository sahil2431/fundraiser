import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navabar from './components/Navabar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'

const Layout = () => {
  const [isOpen , setIsOpen] = useState(false)
  return (
    <>
      <Navabar openSidebar={() => setIsOpen(true)}/>
      <Sidebar isSideOpen={isOpen} close={() => setIsOpen(false)}/>
      <Content/>
      <Outlet/>
    </>
  )
}

export default Layout
