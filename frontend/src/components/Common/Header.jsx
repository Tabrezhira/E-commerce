import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from './Navbar'

function Header() {
  return (
    <header className=' border-b border-gray-200'>
        {/* Topbar */}
        <Topbar/>
        {/* navbar */}
        <Navbar/>
        {/* Cart Drawer */}
    </header>
  )
}

export default Header