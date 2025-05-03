import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function UserLayouts() {
    return (
        <>
            <div className=" min-w-screen min-h-screen bg-gray-100 flex">
                <Sidebar />
                <div className="w-full">
                    <Navbar />
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
