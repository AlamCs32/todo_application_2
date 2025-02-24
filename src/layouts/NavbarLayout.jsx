import Navbar from '@/components/common/Navbar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const NavbarLayout = () => {
    return (
        <div>
            <Navbar />
            <div
                className='px-6 my-5 max-w-screen-2xl mx-auto'
            >
                <Outlet />
            </div>
        </div>
    )
}

export default NavbarLayout