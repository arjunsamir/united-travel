import React, { useContext, useEffect } from 'react';

// Import Steps
import FlightWrapper, { steps as flightSteps } from './wrappers/FlightWrapper'
import MapWrapper, { steps as mapSteps } from './wrappers/MapWrapper';
import LoginWrapper, { steps as loginSteps } from './wrappers/LoginWrapper';
import CheckoutWrapper, { steps as checkoutSteps } from './wrappers/CheckoutWrapper';

// Import State
import { AppContext } from '../store';

// Import Utilities
import { constructWrappers } from '../helpers/utils'
import axios from 'axios';

// Construct Step Wrappers
const stepWrappers = constructWrappers(
    [FlightWrapper, flightSteps],
    [MapWrapper, mapSteps],
    [LoginWrapper, loginSteps],
    [CheckoutWrapper, checkoutSteps]
);


// Create Bookign Application Component
const Booking = () => {

    const { state, dispatch } = useContext(AppContext);

    useEffect(() => {

        const validateSession = async () => {

            const res = await axios.post('/auth');

            if (res?.data?.user) dispatch({
                type: 'SET_APP_USER',
                payload: res.data.user
            })

        }

        if (!state.app.user) validateSession();

    }, [])

    const Wrapper = stepWrappers[state.app.step] ?? <div>Component not found</div>;

    return <Wrapper />

}

export default Booking;
