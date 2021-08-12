// Import React Defaults
import React, { useReducer, useRef } from "react";

// Import Contexts
import AppContext from "./store/context";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs'

// Import Store
import initialState from './store/initialState';
import reducer from "./store/reducer";

// Import Components
import Map from './components/Map';
import Loader from './components/BookingLoader';

// Import Steps
import ServiceType from "./steps/ServiceType";
import FlightLocation from "./steps/FlightLocation";


// // Import Tools
// import axios from 'axios';
// import Validator from './helpers/Validator';
// import Transition from './helpers/Transition';

// Register Steps
const steps = {
    ServiceType,
    FlightLocation
};

// Create Booking App
const BookingApp = ({ copy }) => {

    const [state, dispatch] = useReducer(reducer, initialState);

    const update = (type) => (key, data) => type && key && dispatch({
        type: `${type}_${key}`,
        payload: data
    });

    const Step = steps[state.app.step] || Loader;

    return (
        <AppContext.Provider value={{ state, dispatch, appCopy: copy }}>
            <MuiPickersUtilsProvider utils={DayjsUtils}>
                <section className="booking">
                    <Map update={update("SET_APP")} />

                    {state.app.map ? 
                        <Step
                            updateApp={update("SET_APP")}
                            update={update("UPDATE_RESERVATION")}
                            copy={copy.steps[state.app.step]}
                        /> 
                        : 
                        <Loader />
                    }
                </section>
            </MuiPickersUtilsProvider>
        </AppContext.Provider>
    )

}

export default BookingApp;