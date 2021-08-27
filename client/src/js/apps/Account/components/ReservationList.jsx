// Import Base
import React from 'react';

// Import Components
import RideItem from './RideItem';

// Import Helpers
import dayjs from 'dayjs';


const ReservationList = ({ reservations, label, fallback }) => {

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
                />
            ))) : (
                <p>{fallback}</p>
            )}
        </div>
    );

};


export default ReservationList;