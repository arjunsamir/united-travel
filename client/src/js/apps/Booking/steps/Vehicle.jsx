// Import The Default Things
import React, { useContext, useEffect, useState } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import VehiclePicker from '../components/VehiclePicker';


// Import Helpers
import axios from 'axios';


// Create Step
const Vehicle = ({ update, copy }) => {

    // Destructure Global State
    const {
        state: {
            reservation: {
                passengers,
                origin: { placeId: origin },
                destination: { placeId: destination },
                vehicle,
                route: { distance: { value: distance } }
            }
        }
    } = useContext(AppContext);


    // Create Local State
    const [vehicles, setVehicles] = useState([]);
    const [loaded, setLoaded] = useState(false);

    // Fetch Data On Mount
    useEffect(() => {

        const load = async () => {

            const timer = $.timer(1000).start();

            const res = await axios.post('/api/booking/quote', {
                origin,
                destination,
                passengers,
                distance
            });

            // Update State
            update('QUOTE', res?.data?.quote)
            setVehicles(res?.data?.vehicles);

            // Artificial Delay
            await timer.hold();

            // Update State
            setLoaded(true);

        }

        if (!loaded) load();

    }, []);

    return (
        <BookingCard
            back
            showLoader={!loaded}
            contentClass="flex-col"
        >

                <VehiclePicker
                    vehicles={vehicles}
                    selected={vehicle}
                    onChange={(val) => update('VEHICLE', val)}
                    copy={copy}
                />


        </BookingCard>
    )

};


// Export Step
export default Vehicle;