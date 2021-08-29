// Import Base
import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import RideItem from './RideItem';

// Import Helpers
import dayjs from 'dayjs';
import axios from 'axios'


const ReservationList = ({ reservations, label, fallback, setLoader }) => {

    const { transition, update } = useContext(AppContext);

    console.log(reservations);

    return (
        <div className="account__group animate-children">
            <h5>{label}</h5>
            {reservations.length ? (reservations.map(r => (
                <RideItem
                    key={r._id}
                    date={dayjs(r.schedule.pickup).format("dddd MMMM D, YYYY")}
                    service={r.service_type}
                    origin={r.origin.name}
                    destination={r.destination.name}
                    onClick={async () => {

                        // Prevent Duplicate Fetching
                        if (typeof r.vehicle === 'object') {
                            update("current_reservation")(r);
                            return transition.changeView("Reservation")
                        }
                        
                        // Transition Out Current View
                        await transition.out();

                        // Set Loader
                        setLoader(true);

                        // Start A Timer
                        const timer = $.timer(1000).start();

                        // Make Request
                        const res = await axios(`/api/vehicles/${r.vehicle}`);

                        if (!res.data?.data?.data) return;

                        // Wait For 1 Second
                        await timer.hold();

                        // Update State
                        r.vehicle = res.data?.data?.data;
                        update("current_reservation")(r);

                        // Finally Change View
                        transition.changeView("Reservation");
                        
                    }}
                />
            ))) : (
                <p>{fallback}</p>
            )}
        </div>
    );

};


export default ReservationList;