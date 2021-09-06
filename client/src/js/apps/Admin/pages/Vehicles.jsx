import React, { useEffect, useContext, useState } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountPage from '../components/AccountPage';
import Vehicle from '../components/Vehicle';
import { Button } from '../../components/Buttons';

// Import Helpers
import axios from 'axios';

const Rides = () => {

    // Destructure State
    const { state: { vehicles }, update, transition } = useContext(AppContext);


    // Create Local State
    const [isLoading, setIsLoading] = useState(true);


    // Get Reservations on Load
    useEffect(() => {

        // Get And Sort Reservations
        const fetchVehicles = async () => {

            const timer = $.timer(1000).start();

            const res = await axios('/api/vehicles');

            if (!res?.data?.data?.data) return;

            await timer.hold();

            update("vehicles")(res.data.data.data);

            setIsLoading(false);

        }

        // Initialize Load
        fetchVehicles();

    }, []);


    // Create Component
    return (
        <AccountPage showLoader={isLoading} >
            <div className="account__group animate-children">
                <h5>All Vehicles</h5>
                {vehicles && vehicles.map(v => (
                    <Vehicle
                        key={v._id}
                        vehicle={v}
                        onClick={() => {
                            update("current_vehicle")(v);
                            transition.to("ManageVehicle");
                        }}
                    />
                ))}
            </div>

            <div className="account__fields animate-children">
                <h5>Add Vehicle</h5>
                <Button
                    text="Add New Vehicle"
                    onClick={() => {
                        update("current_vehicle")(null);
                        transition.to("ManageVehicle");
                    }}
                />
            </div>
        </AccountPage>
    )

};


export default Rides;