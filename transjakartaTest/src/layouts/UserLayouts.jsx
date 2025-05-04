import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

export default function UserLayouts() {
    return (
        <>
            <div className=" min-w-screen min-h-screen bg-gray-100 flex overflow-x-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col">
                    <Navbar />
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}
