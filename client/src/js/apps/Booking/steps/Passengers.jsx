// Import The Default Things
import React, { useContext } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import QuantitySelector from "../../components/QuantitySelector";


// Create Step
const Passengers = ({ update, copy }) => {

    // Destructure Global State
    const {
        state: { reservation: { passengers } }
    } = useContext(AppContext);

    return (
        <BookingCard back>

            <fieldset>

                <QuantitySelector
                    id="passengers-select"
                    label={copy.title}
                    text={copy.hint}
                    min={1}
                    max={14}
                    value={passengers}
                    placeholder="0"
                    onChange={(val) => update("PASSENGERS", val)}
                    errorCopy={copy.errors}
                />

            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default Passengers;