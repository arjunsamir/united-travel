// Import The Default Things
import React, { useContext, useEffect } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';
import Autocomplete from '../../components/Autocomplete';
import DateTimePicker from '../../components/DateTimePicker';


// Import Helpers
import axios from 'axios';
import { useObjectState } from "../../helpers/hooks";


// Create Step
const FlightLocation = ({ update, updateApp, copy }) => {

    // Destructure Global State
    const { state } = useContext(AppContext);
    const { airports } = state.app;


    // Create Local State
    const [localState, setLocalState] = useObjectState({
        date: null,
        dateTimeStatus: null,
        airlines: null
    });


    // Fetch Data On Mount
    useEffect(() => {

        if (!state.app.airports) {
            axios('/api/data/airports').then(res => updateApp('AIRPORTS', res.data));
        }

        if (!localState.airlines) {
            axios('/api/data/airlines').then(res => setLocalState({ airlines: res.data }));
        }

    }, []);


    console.log(copy);

    // Validate Fields
    const airlineErrors = [];
    const flightNumErrors = [];


    return (
        <BookingCard
            back
            next={{ disabled: false }}
            showLoader={!airports || !localState.airlines}
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

                {/* <Input
                    id="airline-input"
                    icon="airplane"
                    label={copy.labels[1]}
                    placeholder={copy.placeholders[1]}
                    errors={airlineErrors}
                /> */}

                {/* <Autocomplete
                /> */}

                <Input
                    id="flight-num-input"
                    icon="ticket"
                    label={copy.labels[2]}
                    placeholder={copy.placeholders[2]}
                    errors={flightNumErrors}
                />

            </fieldset>

            <fieldset>
                <h5>Date Time Picker Test</h5>
                <DateTimePicker
                    value={localState.date}
                    onChange={(val) => setLocalState({ date: val })}
                    onStatusChange={(val) => setLocalState({ dateTimeStatus: val })}
                    datePicker={{
                        label: "Date",
                        placeholder: "Select Date"
                    }}
                    timePicker={{
                        label: "Time",
                        placeholder: "Select Time"
                    }}
                />
            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default FlightLocation;