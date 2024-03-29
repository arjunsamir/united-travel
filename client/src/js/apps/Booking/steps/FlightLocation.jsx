// Import The Default Things
import React, { useContext, useEffect, useState } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import AirlineSearch from '../components/AirlineSearch';


// Import Helpers
import axios from 'axios';


// Create Step
const FlightLocation = ({ update, updateApp, copy }) => {

    // Destructure Global State
    const { state } = useContext(AppContext);
    const { airports } = state.app;
    const { flight } = state.reservation;


    // Create Local State
    const [airlines, setAirlines] = useState();
    const [loaded, setLoaded] = useState(false);


    // Fetch Data On Mount
    useEffect(() => {

        const load = async () => {

            const timer = $.timer(1000).start();

            const promises = [axios('/api/data/airlines').then(res => setAirlines(res.data))];

            if (!state.app.airports) promises.push(axios('/api/data/airports').then(res => updateApp('AIRPORTS', res.data)));

            await Promise.all(promises);

            await timer.hold();

            setLoaded(true);

        }

        if (!loaded) load();

    }, []);

    return (
        <BookingCard
            back
            showLoader={!loaded}
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
                   selected={flight.airport.code}
                   onSelect={(selected) => update('AIRPORT', selected.value)}
                />

            </fieldset>

            <fieldset>

                <h5 className="animate-item">{copy.infoTitle}</h5>

                <AirlineSearch
                    id="airline-search"
                    label={copy.labels[1]}
                    placeholder={copy.placeholders[1]}
                    airlines={airlines ?? {}}
                    value={flight.airline}
                    onChange={(val) => update('AIRLINE', val)}
                />

                <Input
                    id="flight-num-input"
                    icon="ticket"
                    label={copy.labels[2]}
                    placeholder={copy.placeholders[2]}
                    value={flight.number}
                    onChange={(val) => update("FLIGHT-NUMBER", val)}
                />

            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default FlightLocation;