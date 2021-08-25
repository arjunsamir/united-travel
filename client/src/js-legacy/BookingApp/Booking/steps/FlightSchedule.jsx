// Import Defaults
import React, { useState, useContext, useEffect } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Molecules
import DateTimePicker from '../../components/organisms/DateTimePicker';
import Dropdown from '../../components/molecules/Dropdown';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';

// Import Utils
import { bemify } from '../../helpers/utils';
import axios from 'axios';

const dropdownItems = [
    {
        text: '2 hours before my flight',
        value: 2
    },
    {
        text: '2 1/2 hours before my flight',
        value: 2.5
    },
    {
        text: '3 hours before my flight',
        value: 3
    }
]


// Flight Location Step
const FlightLocation = ({ navigateTo, updateState }) => {

    // Create bemify instance
    const bc = bemify('booking-card');

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Create Shortcut
    const { flight } = state.reservation;

    // Determing Flight Type
    const isDeparting = flight.type && flight.type === 'departing';

    // Set Allowed Actions
    const allowed = flight.time && (isDeparting ? flight.buffer : true) ? ['previous', 'next'] : ['previous'];

    // Create Local State
    const [error, setError] = useState(false);
    const [airlines, setAirlines] = useState(null)


    // Fetch Airline Data
    useEffect(() => {

        const getAirlineData = async () => {

            try {
                const res = await axios('/api/data/airlines');
                setAirlines(res.data)
            }
            catch (err) {
                setError(true)
            }

        }

        if (!airlines) getAirlineData();

    }, [])

    // Crreate Rendered Component
    return (
        <BookingCard
            title={<>More <span>flight</span> details</>}
            text="Help us schedule your ride by providing some information about your flight schedule."
            allowed={allowed}
            showLoader={airlines ? false : true}
            showError={error}
            previous={() => navigateTo('flight-details')}
            next={() => navigateTo('flight-location')}
        >

            <div className={bc('fieldset')}>
                <h4 className={bc('fieldset-title')}>Flight Date &amp; time</h4>
                <DateTimePicker
                    date={flight.time}
                    initialDate={new Date().setHours(12, 0, 0, 0)}
                    onDateChange={(date) => updateState('flight-time', date.toString())}
                />
            </div>

            {isDeparting && (<div className={bc('fieldset')}>
                <h4 className={bc('fieldset-title')}>Arrive at the airport</h4>
                <Dropdown
                    items={dropdownItems ?? []}
                    defaultItem="Select Time"
                    selected={dropdownItems && dropdownItems.find(item => item.value == flight.buffer)}
                    onSelect={(item = {}) => updateState('FLIGHT-BUFFER', item.value)}
                />
                
            </div>)}

        </BookingCard>
    )

}

export default FlightLocation;