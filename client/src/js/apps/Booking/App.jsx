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


// // Import Tools
// import axios from 'axios';
// import Validator from './helpers/Validator';
// import Transition from './helpers/Transition';

// Register Steps
const steps = { ServiceType };


const BookingApp = ({ copy }) => {
    

    // console.log(copy);

    const [state, dispatch] = useReducer(reducer, initialState);


    const update = (type) => (key, data) => type && key && dispatch({
        type: `${type}_${key}`,
        payload: data
    });

    const Step = steps[state.app.step] || Loader;

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <MuiPickersUtilsProvider utils={DayjsUtils}>
                <section className="booking">
                    <Map update={update("SET_APP")} />

                    {state.app.map ? 
                        <Step
                            updateApp={update("SET_STEP")}
                            update={update("UPDATE_RESERVATION")}
                            copy={copy[state.app.step]}
                        /> 
                        : 
                        <Loader />
                    }

                    
                    
                    {/* <Step
                        copy={getCopy(copy, state.step)}
                        exit={back}
                        authenticate={async (endpoint, data) => {
                            const res = await axios.post(endpoint, data);
                            console.log(res);
                            if (!res?.data?.data?.user) return;
                            return res.data.data.user;
                            // onLogin && onLogin(res.data.data.user)
                        }}
                        update={(field) => {
                            const type = `SET_${field.toUpperCase()}`;
                            return (data) => dispatch({ type, data })
                        }}
                        state={state}
                        referral={referral}
                        validator={new Validator(copy.errors)}
                        transition={transition.current}
                    /> */}
                </section>
            </MuiPickersUtilsProvider>
        </AppContext.Provider>
    )

}

export default BookingApp;