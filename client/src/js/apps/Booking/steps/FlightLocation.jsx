// Import The Default Things
import React, { useContext, useState } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Input from '../../components/Input';


// Create Step
const FlightLocation = ({ update, copy }) => {

    const { state } = useContext(AppContext);

    console.log(copy);

    // Validate Fields
    const airlineErrors = [];
    const flightNumErrors = [];

    return (
        <BookingCard
            back
            next={{ disabled: false }}
        >

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

        </BookingCard>
    )

};


// Export Step
export default FlightLocation;