import React from 'react'
import avatar from '../assets/avatar.png'

export default function Navbar() {
    return (
        <>
            {/* Navbar */}
            <div className="main-container w-full h-fit px-4 py-4 text-[16px] font-semibold bg-white flex justify-between items-center">
                <h1 className='text-[16px] font-semibold'>Vehicles</h1>
                <div className="user flex gap-3 items-center bg-gray-100 px-3 py-2 rounded-full">
                    <img src={avatar} style={{ width: "28px" }} alt="" />
                    <h1 className='text-[14px] font-semibold'>Hello, Yogi Muhammad Irshad</h1>
                </div>
            </div>
        </>
    )
}
