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

// Import Date Time Libraries
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs'
import enLocale from 'dayjs/locale/en';
import esLocale from 'dayjs/locale/es';

// Import Theming
import { ThemeProvider } from '@material-ui/styles';
import theme from '../data/materialTheme';


// Create Views Registry
const views = { Settings, Reservation }


// Create Locale
const locales = {
    en: enLocale,
    es: esLocale
};


// Create Account App
const App = ({ copy, resCopy }) => {

    // Destructure State
    const [state, dispatch] = useReducer(reducer, initialState);

    // Create Refs
    const element = useRef();
    const transition = useRef(new Transition(dispatch));

    // Update Container
    useEffect(() => {
        console.log(state.view);
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
            <MuiPickersUtilsProvider utils={DayjsUtils} locale={locales[window.locale]}>
                <ThemeProvider theme={theme}>
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
                </ThemeProvider>
            </MuiPickersUtilsProvider>
        </AppContext.Provider>
    )
    
}

export default App;