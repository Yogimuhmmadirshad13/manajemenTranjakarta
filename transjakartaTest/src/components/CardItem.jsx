import React from 'react'
import Bus from '../assets/Bus.png'
import { Gps } from 'iconsax-reactjs'
import { Link } from 'react-router-dom'

export default function CardItem({ vehicle }) {
    return (
        <>
            <div className="bg-white rounded-lg border border-gray-200 shadow-md">
                <div className="bg-white rounded-lg p-2 border-t-8 border-blue-700">
                    <div className="flex items-center gap-4 px-2.5 pb-2 border-b-1 border-b-gray-400">
                        <img src={Bus} style={{ width: "80px", height: "80px" }} alt="bus-Image" />
                        <div className="w-full">
                            <div className="flex items-center justify-between ">
                                <h2 className="text-[23px] py-1.5 font-bold">#{vehicle.attributes.label || 'N/A'}</h2>
                                <p className="text-[12px] text-gray-600 font-semibold bg-gray-100 px-3 py-1 rounded-full border border-gray-400">{vehicle.attributes.current_status}</p>
                            </div>
                            <p className="text-gray-500 text-[12px]"> Updated At: {new Date(vehicle.attributes.updated_at).toLocaleString()}</p>
                        </div>
                    </div>

                    <div className="coordinate flex gap-5 px-1.5 pt-3.5 pb-2.5">
                        <div className="latitude-content w-full">
                            <h5 className='text-[14px] font-normal text-gray-500'>Latitude</h5>
                            <p className="text-[16px] font-normal text-[#212121] py-1 flex items-center gap-2"><Gps size="18" color="#FF8A65" variant="Bold" />{vehicle.attributes.latitude}</p>
                        </div>
                        <div className="longtitude-content w-full">
                            <h5 className='text-[14px] font-normal text-gray-500'>Longtitude</h5>
                            <p className="text-[16px] font-normal text-[#212121] py-1 flex items-center gap-2"><Gps size="18" color="#FF8A65" variant="Bold" />{vehicle.attributes.longitude}</p>
                        </div>
                    </div>

                    <Link to={`/vehicle/${vehicle.id}`}>
                        <button className='border-[1.5px] border-blue-700 text-blue-700 w-full p-2 my-2 rounded-full cursor-pointer'>View Detail</button>
                    </Link>
                </div>
            </div>
        </>
    )
}
