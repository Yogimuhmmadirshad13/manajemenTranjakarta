import React from 'react'
import logo2 from '../assets/logo2.png'
import { Car } from 'iconsax-reactjs'
import { Link } from 'react-router-dom'


export default function Sidebar() {
    return (
        <>
            {/*Sidebar */}
            <div className="sidebar-header w-[200px] max-h-full bg-white px-4 py-4">
                <Link to={"/"}>
                    <div className="logo p-5 ">
                        <img src={logo2} alt="logo" />
                    </div>
                </Link>

                <div className="sidebar-Content">
                    <h2 className='px-1.5 py-2 text-[14px] font-semibold text-gray-500'>Menu</h2>
                    <Link to={"/Vehicle"}>
                        <button className='flex gap-3 items-center px-5 py-2.5 mt-3 bg-gray-100 text-[14px] font-medium rounded-md w-full text-[#212121] cursor-pointer'><Car size="20" color="#808080" variant="Bold" />Vehicle</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
