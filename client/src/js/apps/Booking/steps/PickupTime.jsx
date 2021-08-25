// Import The Default Things
import React, { useContext } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import DateTimePicker from '../../components/DateTimePicker';


// Create Step
const FlightSchedule = ({ update, copy }) => {

    // Destructure Global State
    const {
        state: { reservation: { schedule: { pickup } } }
    } = useContext(AppContext);

    return (
        <BookingCard back>

            <fieldset>

                <DateTimePicker
                    value={pickup}
                    onChange={(val) => update("PICKUP-TIME", val)}
                    datePicker={{
                        label: copy.labels[0],
                        placeholder: copy.placeholder
                    }}
                    timePicker={{
                        label: copy.labels[1],
                        placeholder: copy.placeholder
                    }}
                />

            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default FlightSchedule;