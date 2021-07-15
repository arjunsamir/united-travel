// Import React and Components
import React, { useReducer } from 'react';

// Import Date Picker Contexts
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayjsUtils from '@date-io/dayjs'

// Import State & Dispatch
import { AppContext, reducer, initialState } from './store'

// Import Components
import Booking from './Booking';

// Create App Component
const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>

            <MuiPickersUtilsProvider utils={DayjsUtils}>
                <Booking />
            </MuiPickersUtilsProvider>
            
        </AppContext.Provider>
    )

}

export default App;