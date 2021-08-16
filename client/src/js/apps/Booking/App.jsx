// Import React Defaults
import React, { useReducer, useRef } from "react";

// Import Contexts
import AppContext from "./store/context";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';


// Import Date Time Libraries
import DayjsUtils from '@date-io/dayjs'
import enLocale from 'dayjs/locale/en';
import esLocale from 'dayjs/locale/es';

// Import Theming
import { ThemeProvider } from '@material-ui/styles';
import theme from '../data/materialTheme';


// Import Store
import initialState from './store/initialState';
import reducer from "./store/reducer";

// Import Components
import Map from './components/Map';
import Loader from './components/BookingLoader';

// Import Steps
import ServiceType from "./steps/ServiceType";
import PickupTime from './steps/PickupTime';
import FlightLocation from "./steps/FlightLocation";
import FlightSchedule from "./steps/FlightSchedule";
import CruiseLocation from "./steps/CruiseLocation";
import CruiseSchedule from "./steps/CruiseSchedule";
import Route from "./steps/Route";
import Passengers from './steps/Passengers';
import Vehicle from './steps/Vehicle';
import ChildSeats from './steps/ChildSeats';
import Notes from './steps/Notes';

// Import Helpers
import Transition from './helpers/Transition';


// Create Locale
const locales = {
    en: enLocale,
    es: esLocale
};


// Register Steps
const steps = {
    ServiceType,
    PickupTime,
    FlightLocation,
    FlightSchedule,
    CruiseLocation,
    CruiseSchedule,
    Route,
    Passengers,
    Vehicle,
    ChildSeats,
    Notes
};

const bindDispatcher = (dispatcher, type) => (key, data) => type && key && dispatcher({
    type: `${type}_${key}`,
    payload: data
});

// Create Booking App
const BookingApp = ({ copy }) => {

    // Set up Stae
    const [state, dispatch] = useReducer(reducer, initialState);


    // Get Current Stap
    const Step = steps[state.app.step] || Loader;


    // Create Action Dispatcher
    const updateApp = bindDispatcher(dispatch, "SET_APP");
    const update = bindDispatcher(dispatch, "UPDATE_RESERVATION");

    return (
        <AppContext.Provider value={{ 
            state,
            update,
            updateApp,
            appCopy: copy,
            transition: new Transition(updateApp)
        }}>
            <MuiPickersUtilsProvider utils={DayjsUtils} locale={locales[window.locale]}>
                <ThemeProvider theme={theme}>
                    <section className="booking">
                        <Map />
                        {state.app.map ? 
                            <Step
                                updateApp={updateApp}
                                update={update}
                                copy={copy.steps[state.app.step]}
                            /> 
                            : 
                            <Loader />
                        }
                    </section>
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </AppContext.Provider>
    )

}

export default BookingApp;