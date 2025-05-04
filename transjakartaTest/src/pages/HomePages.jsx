import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardItem from '../components/CardItem'
import Modal from '../components/Modal'
import Pagination from '../components/Pagination'

export default function HomePages() {
    const [vehicles, setVehicles] = useState([])
    const [loading, setLoading] = useState(true)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedVehicle, setSelectedVehicle] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [postPerPage, setPostPerPage] = useState(5)


    const getVehicles = async () => {
        try {
            const response = await axios.get('https://api-v3.mbta.com/vehicles')
            setVehicles(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVehicles()
    }, [])

    if (loading) return <p>Loading...</p>

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPostVehicles = vehicles.slice(firstPostIndex, lastPostIndex)

    return (
        <>
            <section>
                <div className="container bg-white rounded-md">
                    <h1 className='px-8 py-5 font-bold text-[20px]'>List Vehicles</h1>
                    <div className="card grid grid-cols-3 px-8 py-0 gap-4">
                        {currentPostVehicles.map((vehicle) => (
                            <CardItem
                                key={vehicle.id}
                                vehicle={vehicle}
                                onViewDetail={() => {
                                    setSelectedVehicle(vehicle)
                                    setIsModalOpen(true)
                                }}
                            />
                        ))}
                    </div>
                    <Pagination
                        totalPosts={vehicles.length}
                        postsPerPage={postPerPage}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage}
                    />
                </div>
            </section>


            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {selectedVehicle && (
                    <div className="p-4">
                        <h1 className="text-2xl font-bold mb-4">Detail Kendaraan ID: {selectedVehicle.id}</h1>
                        <div className="bg-white rounded-lg shadow-md p-4 border">
                            <p><strong>Label:</strong> {selectedVehicle.attributes.label || 'N/A'}</p>
                            <p><strong>Status:</strong> {selectedVehicle.attributes.current_status}</p>
                            <p><strong>Latitude:</strong> {selectedVehicle.attributes.latitude}</p>
                            <p><strong>Longitude:</strong> {selectedVehicle.attributes.longitude}</p>
                            <p><strong>Speed:</strong> {selectedVehicle.attributes.speed}</p>
                            <p><strong>Bearing:</strong> {selectedVehicle.attributes.bearing}</p>
                            <p><strong>Direction ID:</strong> {selectedVehicle.attributes.direction_id}</p>
                            <p><strong>Updated At:</strong> {new Date(selectedVehicle.attributes.updated_at).toLocaleString()}</p>
                            <p><strong>Route ID:</strong> {selectedVehicle.relationships?.route?.data?.id || 'N/A'}</p>
                            <p><strong>Trip ID:</strong> {selectedVehicle.relationships?.trip?.data?.id || 'N/A'}</p>
                        </div>
                    </div>
                )}
            </Modal>
        </>
    )
}
