// Import React and Components
import React, { useReducer } from 'react';

// Import State & Dispatch
import { AppContext, reducer, initialState } from './store'

// Import Components
import Booking from './Booking';
// import Login from './Login';
// import Checkout from './Checkout';

// Create App Component
const App = () => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <AppContext.Provider value={{ state, dispatch }}>

            <Booking />

        </AppContext.Provider>
    )

}

export default App;