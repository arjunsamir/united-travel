// Import Defaults
import React, { useState, useContext, useEffect } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Atoms

// Import Molecules
import Field from '../../components/molecules/Field'
import DateTimePicker from '../../components/organisms/DateTimePicker';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';
import Input from '../../components/organisms/Input';

// Import Utils
import { bemify } from '../../helpers/utils';
import axios from 'axios';


// Flight Location Step
const FlightLocation = ({ navigateTo }) => {

    // Create bemify instance
    const bc = bemify('booking-card');

    // Import State & Dispatch
    const { state, dispatch } = useContext(AppContext);

    // Create Shortcut
    const { flight } = state.reservation;

    // Set Allowed Actions
    const allowed = ['previous'];

    // Create Local State
    const [error, setError] = useState(false);
    const [airlines, setAirlines] = useState(null)


    // Fetch Airline Data
    useEffect(() => {

        const getDropdownData = async () => {

            if (airlines) return;

            try {
                const res = await axios('/api/data/airlines');
                setAirlines(res.data)
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
            title={<>More <span>flight</span> details</>}
            text="Help us schedule your ride by providing some information about your flight schedule."
            allowed={allowed}
            showLoader={airlines ? false : true}
            showError={error}
            previous={() => {
                navigateTo('flight-location')
            }}
            next={() => {
                navigateTo('flight-location')
            }}
        >

            <div className={bc('fieldset')}>
                <h4 className={bc('fieldset-title')}>Flight Date &amp; time</h4>
                <DateTimePicker />
                {/* <Input
                    icon="calendar"
                >
                    <Field
                        input={<input type="date" min={(new Date()).toISOString().split('T')[0]} />}
                        label="Date"
                        tooltip="Select a date"
                    />
                </Input> */}
            </div>

            <div className={bc('fieldset')}>
                <h4 className={bc('fieldset-title')}>Airline Information</h4>
            </div>

        </BookingCard>
    )

}

export default FlightLocation;