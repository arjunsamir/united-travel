// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Organizms
import BookingCard from '../../components/organisms/BookingCard';
import Input from '../../components/organisms/Input';
import LocationSearch from '../../components/organisms/LocationSearch';

// Import Utils
import { bemify } from '../../helpers/utils';

// Flight Location Step
const Route = ({ navigateTo, updateState, map }) => {

    // Create bemify instance
    const bc = bemify('booking-card');

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Create Shortcut
    const { flight, airportRide, origin, destination } = state.reservation;

    // Create Cases
    let allowed = origin.selected && destination.selected ? ['previous', 'next'] : ['previous'];
    let showOrigin = true;
    let showDestination = true;
    let title = <>Select a <span>route</span></>;

    if (airportRide) {
        if (flight.type === 'departing') {
            showDestination = false;
            title = <>Where are we <span>picking you up?</span></>;
            allowed = origin.selected ? ['previous', 'next'] : ['previous']
        }
        if (flight.type === 'arriving') {
            showOrigin = false;
            title = <>Where are we <span>dropping you off?</span></>;
            allowed = destination.selected ? ['previous', 'next'] : ['previous']
        }
    }

    // Crreate Rendered Component
    return (
        <BookingCard
            title={title}
            allowed={allowed}
            previous={() => navigateTo(airportRide ? 'flight-details' : 'airport-ride')}
            showLoader={!map}
            next={() => navigateTo('passengers')}
            nextLabel="Passengers Information"
        >

            {map && <div className={bc('fieldset')}>
                
                {showOrigin && (<Input>
                    <LocationSearch
                        id="origin"
                        label="Pickup"
                        map={map}
                        value={origin.selected}
                        onChange={val => updateState('ORIGIN', val)}
                    />
                </Input>)}
                
                {showDestination && (<Input>
                    <LocationSearch
                        id="destination"
                        label="Drop-Off"
                        map={map}
                        value={destination.selected}
                        onChange={val => updateState('DESTINATION', val)}
                    />
                </Input>)}
                
            </div>}

        </BookingCard>
    )

}

export default Route;