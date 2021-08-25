// Import Defaults
import React, { useState, useContext, useEffect } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Molecules
import Field from '../../components/molecules/Field'

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';
import Input from '../../components/organisms/Input';
import AirlineSearch from '../../components/organisms/AirlineSearch';

// Import Utils
import { bemify } from '../../helpers/utils';
import axios from 'axios';


// Flight Location Step
const FlightDetails = ({ navigateTo, updateState }) => {

    // Create bemify instance
    const bc = bemify('booking-card');

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Create Shortcut
    const { flight } = state.reservation;

    // Set Allowed Actions
    const allowed = flight.number && flight.airline ? ['previous', 'next'] : ['previous'];

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
            previous={() => navigateTo('flight-location')}
            next={() => navigateTo('route')}
        >

            <div className={bc('fieldset')}>
                <h4 className={bc('fieldset-title')}>Airline Information</h4>
                <Input icon="airplane">
                    <AirlineSearch
                        airlines={airlines}
                        value={flight.airline}
                        grow="1"
                        label="Airline"
                        tooltip="Please enter your airline"
                        showTooltip={false}
                        onChange={a => updateState('airline', a)}
                    />
                </Input>
            </div>
            
            <div className={bc('fieldset')}>
                <Input icon="ticket">
                    <Field
                        label="Flight Number"
                        grow="1"
                    >
                        <input
                            type="text"
                            placeholder="2204"
                            value={flight.number}
                            onChange={(e) => updateState('flight-number', e.target.value)}
                        />
                    </Field>
                </Input>
            </div>

        </BookingCard>
    )

}

export default FlightDetails;