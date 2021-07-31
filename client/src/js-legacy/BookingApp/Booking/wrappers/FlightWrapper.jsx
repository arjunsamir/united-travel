// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Atoms
import Image from '../../components/atoms/Image'
import Dots from '../../components/atoms/Dots';

// Import Steps
import AirportRide from '../steps/AirportRide';
import FlightLocation from '../steps/FlightLocation';
import FlightSchedule from '../steps/FlightSchedule';
import FlightDetails from '../steps/FlightDetails';
import FlightHelper from '../steps/FlightHelper';

// Register Steps Here
export const steps = {
    'airport-ride': AirportRide,
    'flight-location': FlightLocation,
    'flight-schedule': FlightSchedule,
    'flight-details': FlightDetails,
    'flight-helper': FlightHelper
}


// Create Step
const FlightWrapper = () => {

    const { state, dispatch } = useContext(AppContext);

    const Step = steps[state.app.step];

    return (
        <section className="booking">

            <Image fileName="airport-gate" webp={true} />

            <div className="booking__container">

                <Step
                    navigateTo={(target) => dispatch({
                        type: 'SET_APP_STEP',
                        payload: target
                    })}
                    updateState={(key, data) => key && dispatch({
                        type: `UPDATE_RESERVATION_${key}`,
                        payload: data
                    })}
                />

                <Dots />

            </div>

        </section>
    )

}

export default FlightWrapper;
