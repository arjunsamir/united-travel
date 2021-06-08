// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Molecules
import Select from '../../components/molecules/Select';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';

// Utilities
import { bemify } from '../../helpers/utils';
const bc = bemify('booking-card');

// Dropdown Options
const options = [
    {
        title: 'Yes',
        text: 'I need to be picked up or dropped off at the airport.',
        value: true
    },
    {
        title: 'No',
        text: 'I need a ride to a hotel, theme park, beach, resturant, etc.',
        value: false
    }
];

// Airport Ride Step
const AirportRide = ({ navigateTo }) => {

    // Import State & Dispatch
    const { state, dispatch } = useContext(AppContext);

    // Choose Default Selected Element
    const selected = options.filter(opt => opt.value === state.reservation.airportRide)

    // Set Up State To Track Allowed Naviation Actions
    const allowed = selected.length ? ['next'] : [];

    // Function To Update State
    const updateState = (data) => {
        dispatch({
            type: "UPDATE_RESERVATION_AIRPORT-RIDE",
            payload: data.value
        })
    }

    return (
        <BookingCard
            title={<>Is this an <span>airport</span> ride?</>}
            allowed={allowed}
            next={() => {
                navigateTo('flight-location')
            }}
        >
            <div className={bc('fieldset')}>
                <Select
                    type="radio"
                    options={options}
                    name="airport-ride"
                    selected={selected}
                    onChange={updateState}
                />
            </div>

        </BookingCard>
    )

}

export default AirportRide;
