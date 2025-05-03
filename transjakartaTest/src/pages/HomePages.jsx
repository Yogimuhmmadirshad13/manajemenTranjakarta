import React, { useEffect, useState } from 'react'
import axios from 'axios'
import CardItem from '../components/cardItem'


export default function HomePages() {
    const [vehicles, setVehicle] = useState([])
    const [loading, setLoading] = useState(true)

    const getVehicle = async () => {
        try {
            const response = await axios.get('https://api-v3.mbta.com/vehicles')
            setVehicle(response.data.data)
            console.log(response.data.data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    // const getVehicle = async () => {
    //     axios.get('https://api-v3.mbta.com/vehicles')
    //         .then(response => {
    //             setVehicle((response.data.data))
    //             setLoading(false)
    //             console.log(response.data.data);
    //         }).catch(error => {
    //             setLoading(false)
    //             console.log(error);
    //         })
    // }

    useEffect(() => {
        getVehicle()
    }, [])

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <section>
                <div className="container bg-white rounded-md">
                    <h1 className='px-8 py-5 font-bold text-[20px]'>List Vehicles</h1>
                    <div className="card grid grid-cols-3 px-8 py-0 gap-4">
                        {vehicles.map((vehicle) => (
                            <CardItem key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
