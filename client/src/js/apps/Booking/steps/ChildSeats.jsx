// Import The Default Things
import React, { useContext } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import QuantitySelector from "../../components/QuantitySelector";


// Create Step
const ChildSeats = ({ update, copy }) => {

    // Destructure Global State
    const {
        state: { reservation: { childSeats: values } }
    } = useContext(AppContext);


    const textArr = copy.text.split('{link}');

    const [rear, front, booster] = copy.inputs;

    return (
        <BookingCard
            back
            customText={(
                <p className="small animate-item">{textArr[0]}<a href={copy.link.url} target="_blank">{copy.link.text}</a>{textArr[1]}</p>
            )}
        >

            <fieldset>

                <QuantitySelector
                    id="rear-seat-select"
                    label={rear.label}
                    text={rear.hint}
                    max={4}
                    value={values.rear}
                    placeholder="1"
                    onChange={(val) => update("CHILD-SEATS", ["rear", val])}
                    errorCopy={copy.errors}
                />
                
                <QuantitySelector
                    id="front-seat-select"
                    label={front.label}
                    text={front.hint}
                    max={4}
                    value={values.front}
                    placeholder="1"
                    onChange={(val) => update("CHILD-SEATS", ["front", val])}
                    errorCopy={copy.errors}
                />
                
                <QuantitySelector
                    id="booster-seat-select"
                    label={booster.label}
                    text={booster.hint}
                    max={4}
                    value={values.booster}
                    placeholder="1"
                    onChange={(val) => update("CHILD-SEATS", ["booster", val])}
                    errorCopy={copy.errors}
                />

            </fieldset>

        </BookingCard>
    )

};


// Export Step
export default ChildSeats;