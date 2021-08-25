// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Login Component
import Login from '../../Login';

export const steps = {
    login: true,
}

const LoginWrapper = () => {

    // Access State
    const { dispatch } = useContext(AppContext);

    // Define State Update Function
    const updateState = (key, data) => key && dispatch({
        type: `UPDATE_RESERVATION_${key}`,
        payload: data
    });

    const navigateTo = (target) => dispatch({
        type: 'SET_APP_STEP',
        payload: target
    });

    return (
        <Login
            allowGuests
            onLogin={(user) => {
                updateState('USER', user);
                navigateTo('checkout');
            }}
        />
    )

}

export default LoginWrapper;