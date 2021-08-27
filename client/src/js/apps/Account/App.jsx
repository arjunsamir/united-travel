// Import Base React Dependencies
import React, { useReducer } from 'react';

// Import Store
import  reducer from './store/reducer';
import initialState from './store/initialState';
import AppContext from './store/AppContext';

// Import Helpers
import Transition from './helpers/Transition';

// Import Steps
import Rides from './pages/Rides';
import Profile from './Pages/Profile';
import Wallet from './pages/Wallet';
import Invite from './pages/Invite';

// Import Components
import Nav from './components/Nav';
import Visual from './components/Visual';


// Register Steps
const steps = {
    Rides,
    Profile,
    Wallet,
    Invite
}


// Create Account App
const App = ({ copy }) => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const Step = steps[state.step];

    // Return Component
    return (
        <AppContext.Provider value={{
            state,
            appCopy: copy,
            transition: new Transition(dispatch),
            update: (key) => (val) => dispatch({
                type: `SET_${key.toUpperCase()}`,
                data: val
            })
        }}>
            <div className="account">
                <div className="account__container">
                    <Step />
                    <Visual />
                </div>
                <Nav />
            </div>
        </AppContext.Provider>
    )
    
}

export default App;