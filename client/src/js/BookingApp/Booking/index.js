import React, { useContext } from 'react';

// Import Steps
import Flight, { steps as flightSteps } from './wrappers/Flight'

// Import State
import { AppContext } from '../store';

// Import Utilities
import { constructWrappers } from '../helpers/utils'

// Construct Step Wrappers
const stepWrappers = constructWrappers([Flight, flightSteps])


// Create Bookign Application Component
const Booking = () => {

    const { state } = useContext(AppContext);

    const Wrapper = stepWrappers[state.app.step] ?? <div>Component not found</div>;

    return <Wrapper />
}

export default Booking;
