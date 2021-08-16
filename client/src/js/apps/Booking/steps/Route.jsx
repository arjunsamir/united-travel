// Import The Default Things
import React, { useContext } from "react";


// Import Context
import AppContext from '../store/context';


// Import Booking Card
import BookingCard from "../components/BookingCard";


// Import Unique Components
import MapSearch from '../components/MapSearch';
import Icon from '../../components/Icon';


const Stat = ({ text, icon }) => {

    return (
        <div className="booking-card__route-stat animate-item">
            <Icon icon={icon} />
            <p className="bold h6">{text}</p>
        </div>
    )

}


// Create Step
const Route = ({ copy }) => {

    const {
        state: { reservation: { route } },
        appCopy: { common: { units } }
    } = useContext(AppContext);

    return (
        <BookingCard
            back
            footer={route?.distance && route?.eta && {
                text: (
                    <div className="booking-card__route">
                        <Stat
                            icon="clock"
                            text={route.eta.text.replace("hours", units.hours).replace("mins", units.mins)}
                        />
                        <Stat
                            icon="navigation-circle"
                            text={route.distance.text.replace("mi", units.miles)}
                        />
                    </div>
                )
            }}
        >

            <fieldset>

                <MapSearch
                    labels={copy.labels}
                    placeholders={copy.placeholders}
                    fallbackCopy="No places found..."
                />

            </fieldset>    

        </BookingCard>
    )

};


// Export Step
export default Route;