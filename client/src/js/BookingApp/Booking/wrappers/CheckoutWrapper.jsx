// Import Defaults
import React, { useContext } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Atoms
import Image from '../../components/atoms/Image'

// Import Checkout Component
import Checkout from '../steps/Checkout';

export const steps = {
    checkout: true,
}

const CheckoutWrapper = () => {

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
        <section className="booking">

            <Image fileName="airport-gate" webp={true} />

            <div className="booking__container">

                <Checkout
                    navigateTo={navigateTo}
                    updateState={updateState}
                />

            </div>

        </section>
    )

}

export default CheckoutWrapper;