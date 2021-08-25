// Import Defaults
import React from 'react';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';


// Airport Ride Step
const FlightHelper = ({ navigateTo }) => {


    return (
        <BookingCard
            title="Please have your flight information handy"
            text="For the next few steps you will need to enter your flight information so that we can give you the best experience"
            allowed={['previous', 'next']}
            previous={() => navigateTo('airport-ride')}
            next={() => navigateTo('flight-location')}
        />
    )

}

export default FlightHelper;
