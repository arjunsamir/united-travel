// Import Base React Dependencies
import React, { useReducer, useEffect, useRef } from 'react';

// Import Store
import  reducer from './store/reducer';
import initialState from './store/initialState';
import AppContext from './store/AppContext';

// Import Helpers
import Transition from './helpers/Transition';
import Validator from '../helpers/Validator';


// Import Views
import Reservation from '../Reservation/App';
import Settings from './views/Settings'; 

const views = { Settings, Reservation }

// Create Account App
const App = ({ copy, resCopy }) => {

    // Destructure State
    const [state, dispatch] = useReducer(reducer, initialState);

    // Create Refs
    const element = useRef();
    const transition = useRef(new Transition(dispatch));

    // Update Container
    useEffect(() => {
        transition.current.set(element.current).mount(state.view);
    }, [state.view]);

    // Determine View
    const View = views[state.view];

    // Return Component
    return (
        <AppContext.Provider value={{
            state,
            appCopy: copy,
            transition: transition.current,
            validator: new Validator(copy.errors),
            update: (key) => (val) => dispatch({
                type: `SET_${key.toUpperCase()}`,
                data: val
            })
        }}>
            <section ref={element}>
                <View
                    reservation={state.currentReservation}
                    copy={resCopy}
                    back={{
                        text: "Back",
                        onClick: () => transition.current.changeView("Settings")
                    }}
                />
            </section>
            
        </AppContext.Provider>
    )
    
}

export default App;