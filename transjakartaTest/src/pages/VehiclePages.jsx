import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function VehiclePages() {
    const { id } = useParams()
    const [vehicle, setVehicle] = useState(null)
    const [loading, setLoading] = useState(true)

    const getVehicle = async () => {
        try {
            const response = await axios.get(`https://api-v3.mbta.com/vehicles/${id}`)
            setVehicle(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getVehicle()
    }, [])

    if (loading) return <p className="p-4">Loading detail...</p>

    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">Detail Kendaraan ID: {vehicle.id}</h1>
                <div className="bg-white rounded-lg shadow-md p-4 border">
                    <p><strong>Label:</strong> {vehicle.attributes.label || 'N/A'} </p>
                    <p><strong>Status:</strong> {vehicle.attributes.current_status}</p>
                    <p><strong>Latitude:</strong> {vehicle.attributes.latitude}</p>
                    <p><strong>Longitude:</strong> {vehicle.attributes.longitude}</p>
                    <p><strong>Speed:</strong> {vehicle.attributes.speed}</p>
                    <p><strong>Bearing:</strong> {vehicle.attributes.bearing}</p>
                    <p><strong>Direction ID:</strong> {vehicle.attributes.direction_id}</p>
                    <p><strong>Updated At:</strong> {new Date(vehicle.attributes.updated_at).toLocaleString()}</p>
                    <p><strong>Route ID:</strong> {vehicle.relationships.route.data.id}</p>
                    <p><strong>Trip ID:</strong> {vehicle.relationships.trip.data.id}</p>
                </div>
            </div>
        </>
    )
}

