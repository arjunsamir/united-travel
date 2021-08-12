// Import The Default Things
import React, { useContext, useEffect } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import DateTimePicker from '../../components/DateTimePicker';


// Import Helpers
import axios from 'axios';


// Create Step
const FlightLocation = ({ update, updateApp, copy }) => {

    // Destructure Global State
    const { state } = useContext(AppContext);
    const { airports } = state.app;


    // Use Effect
    useEffect(() => {

        // Fetch Airports
        const fetchAirports = async () => {
            const res = await axios('/api/data/airports');
            updateApp('AIRPORTS', res.data);
        };

        // Fetch Airports if not set
        if (!state.app.airports) fetchAirports();

    }, []);


    console.log(copy);

    // Validate Fields
    const airlineErrors = [];
    const flightNumErrors = [];

    return (
        <BookingCard
            back
            next={{ disabled: false }}
            showLoader={!airports}
        >

            <fieldset>

                <Dropdown
                   id="airport-select"
                   label={copy.labels[0]}
                   placeholder={copy.placeholders[0] || "Placeholder Value"}
                   options={(airports || []).map(apt => ({
                       text: `${apt.code} - ${apt.name}`,
                       value: apt.code
                   }))}
                   selected={state.reservation.flight.airport.code}
                   onSelect={(selected) => update('AIRPORT', selected.value)}
                   errors={[]}
                />

            </fieldset>

            <fieldset>

                <h5 className="animate-item">{copy.infoTitle}</h5>

                <Input
                    id="airline-input"
                    icon="airplane"
                    label={copy.labels[1]}
                    placeholder={copy.placeholders[1]}
                    errors={airlineErrors}
                />

                <Input
                    id="flight-num-input"
                    icon="ticket"
                    label={copy.labels[2]}
                    placeholder={copy.placeholders[2]}
                    errors={flightNumErrors}
                />

            </fieldset>

            <fieldset>
                <DateTimePicker />
            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default FlightLocation;