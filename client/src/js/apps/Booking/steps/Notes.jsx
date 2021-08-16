// Import The Default Things
import React, { useContext } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import Textarea from "../../components/Textarea";


// Create Step
const Notes = ({ update, copy }) => {

    // Destructure Global State
    const {
        state: { reservation: { notes } }
    } = useContext(AppContext);

    return (
        <BookingCard back>

            <fieldset>

                <Textarea
                    id="special-notes"
                    label={copy.label}
                    placeholder={copy.placeholder}
                    value={notes}
                    onChange={(val) => update("NOTES", val)}
                />

            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default Notes;