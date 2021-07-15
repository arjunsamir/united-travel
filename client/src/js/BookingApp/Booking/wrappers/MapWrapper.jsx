// Import Defaults
import React, { useContext, useState } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Organisms
import Map from '../../components/organisms/Map';

// Import Steps
import Route from '../steps/Route';
import Passengers from '../steps/Passengers';
import Vehicle from '../steps/Vehicle';
import Notes from '../steps/Notes';
import Summary from '../steps/Summary';

// Register Steps
export const steps = {
    route: Route,
    passengers: Passengers,
    vehicle: Vehicle,
    notes: Notes,
    summary: Summary,
    payment: null,
    confirmation: null
}

const MapWrapper = () => {

    // Access State
    const { state, dispatch } = useContext(AppContext);

    // Get Current Step Component
    const Step = steps[state.app.step];

    // Create Local State
    const [map, setMap] = useState();

    // Define State Update Function
    const updateState = (key, data) => key && dispatch({
        type: `UPDATE_RESERVATION_${key}`,
        payload: data
    })

    return (
        <section className="booking">

            <Map
                onLoad={setMap}
                updateState={updateState}
            />

            <div className="booking__container booking__container--map">

                <Step
                    navigateTo={(target) => dispatch({
                        type: 'SET_APP_STEP',
                        payload: target
                    })}
                    updateState={updateState}
                    map={map}
                />

            </div>

        </section>
    )

}

export default MapWrapper;