// Import Defaults
import React, { useState, useContext, useEffect } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Atoms
import Dropdown from '../../components/molecules/Dropdown';

// Import Molecules
import Select from '../../components/molecules/Select';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';

// Import Utils
import { bemify } from '../../helpers/utils';
import axios from 'axios';

// Construct Dropdown Items From Raw Data
const constructDropdownItems = (items) => {
    return items && items.map(item => ({
        text: `${item.code} - ${item.name}`,
        value: item.code
    }))
}

// Selectable Options
const options = [
    {
        title: 'Arriving Flight',
        text: 'I need to be picked up from the airport.',
        value: 'arriving'
    },
    {
        title: 'Departing Flight',
        text: 'I need to be dropped off at the airport before my flight.',
        value: 'departing'
    }
]

// Flight Location Step
const FlightLocation = ({ navigateTo }) => {

    // Create bemify instance
    const bc = bemify('booking-card');

    // Import State & Dispatch
    const { state, dispatch } = useContext(AppContext);

    // Create Shortcut
    const { flight } = state.reservation;

    // Load Dropdown Items
    const dropdownItems = constructDropdownItems(state.app.airports);

    // Create Local State
    const [error, setError] = useState(false);
    const allowed = flight.type && flight.airport.code ? ['previous', 'next'] : ['previous'];

    // Fetch Airport Data
    useEffect(() => {

        const getDropdownData = async () => {

            if (state.app.airports) return;

            try {
                const res = await axios('/api/data/airports');
                dispatch({
                    type: 'SET_APP_AIRPORTS',
                    payload: res.data
                })
            }
            catch (err) {
                setError(true)
            }

            
        }

        getDropdownData();

    }, [])

    // Function To Update State
    const updateState = (key, data) => {

        // Prevent Some Potential Errors
        if (!key) return;

        // Update Airport Reservation
        dispatch({
            type: `UPDATE_RESERVATION_${key}`,
            payload: data
        })
        
    }

    // Crreate Rendered Component
    return (
        <BookingCard
            title={<>Details about your <span>flight</span></>}
            allowed={allowed}
            showLoader={!dropdownItems}
            showError={error}
            previous={() => {
                navigateTo('airport-ride')
            }}
            next={() => {
                navigateTo('flight-schedule')
            }}
        >

            <div className={bc('fieldset')}>
                <h4 className={bc('fieldset-title')}>Select an airport</h4>
                <Dropdown
                    items={dropdownItems ?? []}
                    defaultItem="Select Airport"
                    selected={dropdownItems && dropdownItems.find(item => item.value === flight.airport.code)}
                    onSelect={(item = {}) => updateState('AIRPORT', item.value)}
                />
                
            </div>

            <div className={bc('fieldset')}>
                <h4 className={bc('fieldset-title')}>Choose a flight type</h4>
                <Select
                    type="radio"
                    name="flight-type"
                    options={options}
                    selected={options.filter(opt => opt.value === flight.type)}
                    onChange={(data) => updateState('FLIGHT-TYPE', data.value)}
                />
            </div>

        </BookingCard>
    )

}

export default FlightLocation;