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

    const [routes, setRoutes] = useState([])
    const [trips, setTrips] = useState([])
    const [selectedRoute, setSelectedRoute] = useState('')
    const [selectedTrip, setSelectedTrip] = useState('')

    // Fetch vehicles
    const getVehicles = async () => {
        try {
            const response = await axios.get('https://api-v3.mbta.com/vehicles')
            setVehicles(response.data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    // Fetch routes
    const getRoutes = async () => {
        try {
            const response = await axios.get('https://api-v3.mbta.com/routes')
            setRoutes(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    // Fetch trips
    const getTrips = async () => {
        try {
            const response = await axios.get('https://api-v3.mbta.com/trips')
            setTrips(response.data.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getVehicles()
        getRoutes()
        getTrips()
    }, [])

    if (loading) return <p>Loading...</p>

    // Filter vehicles by selected route/trip
    const filteredVehicles = vehicles.filter(vehicle => {
        const matchRoute = selectedRoute ? vehicle.relationships?.route?.data?.id === selectedRoute : true
        const matchTrip = selectedTrip ? vehicle.relationships?.trip?.data?.id === selectedTrip : true
        return matchRoute && matchTrip
    })

    const lastPostIndex = currentPage * postPerPage
    const firstPostIndex = lastPostIndex - postPerPage
    const currentPostVehicles = filteredVehicles.slice(firstPostIndex, lastPostIndex)

    return (
        <>
            <section>
                <div className="container bg-white rounded-md">
                    <h1 className='px-8 py-5 font-bold text-[20px]'>List Vehicles</h1>

                    {/* Dropdown filters */}
                    <div className="flex gap-4 px-8 py-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Filter by Route</label>
                            <select
                                value={selectedRoute}
                                onChange={e => {
                                    setSelectedRoute(e.target.value)
                                    setCurrentPage(1) // reset ke page 1
                                }}
                                className="border rounded px-2 py-1 w-full"
                            >
                                <option value="">All Routes</option>
                                {routes.map(route => (
                                    <option key={route.id} value={route.id}>
                                        {route.attributes.long_name || route.id}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Filter by Trip</label>
                            <select
                                value={selectedTrip}
                                onChange={e => {
                                    setSelectedTrip(e.target.value)
                                    setCurrentPage(1) // reset ke page 1
                                }}
                                className="border rounded px-2 py-1 w-full"
                            >
                                <option value="">All Trips</option>
                                {trips.map(trip => (
                                    <option key={trip.id} value={trip.id}>
                                        {trip.id}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* List vehicles */}
                    <div className="card grid grid-cols-3 px-8 py-0 gap-4">
                        {currentPostVehicles.length > 0 ? (
                            currentPostVehicles.map((vehicle) => (
                                <CardItem
                                    key={vehicle.id}
                                    vehicle={vehicle}
                                    onViewDetail={() => {
                                        setSelectedVehicle(vehicle)
                                        setIsModalOpen(true)
                                    }}
                                />
                            ))
                        ) : (
                            <p className="col-span-3 text-center text-gray-500">No vehicles found</p>
                        )}
                    </div>

                    {/* Pagination */}
                    <Pagination
                        totalPosts={filteredVehicles.length}
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
