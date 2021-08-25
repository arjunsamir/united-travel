import React, { useContext, useEffect } from 'react';

// Import Context
import AppContext from '../store/context';

// Import Steps
import Summary from './Summary';
import Login from './Login';
import Checkout from './Checkout';
import Confirmation from './Confirmation';


const steps = {
    Summary,
    Login,
    Checkout,
    Confirmation
}


const CheckoutApp = () => {

    // Destructure Global State
    const { state: { app: { step, map } } } = useContext(AppContext);
    const Step = steps[step];


    // Change Map View
    useEffect(() => {

        map.setClass("min");

    }, []);

    return <Step />
};


export default CheckoutApp;