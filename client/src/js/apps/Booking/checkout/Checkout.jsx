import React, { useContext, useEffect } from 'react';

// Import Context
import AppContext from '../store/context';

// Import Components
import BookingPage from '../components/BookingPage';
import { Button } from '../../components/Buttons';
import Icon from '../../components/Icon';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';

// Import Stripe Checkout
import { Elements } from '@stripe/react-stripe-js';
import useStripeCheckout, { stripeOptions } from '../helpers/useStripeCheckout';


// Create Checkout Component
const Checkout = () => {

    // Destructure State and create shortcut variables
    const { state: { app }, appCopy } = useContext(AppContext);
    const copy = appCopy.steps[app.step];

    // Load Stripe
    const { stripe, cost, ...payment } = useStripeCheckout();

    // Create State
    const [state, setState] = useObjectState({
        method: null,
        error: '',
        saveCard: null,
        name: app.user?.name
    });
    

    return (
        <BookingPage
            back="Summary"
            showLoader={!stripe}
        >
            {stripe && (
                <Elements options={stripeOptions} stripe={stripe}>

                    <div className="booking-view__header animate-children">
                        <h3>{copy.title}</h3>
                        <h5>${(cost / 100).toFixed(2)}</h5>
                    </div>

                    <hr className="booking-view__divider animate-item" />

                    <div className="booking-view__block animate-item">
                        <p>{copy.notice}</p>
                    </div>

                    <div className="booking-view__section animate-children">
                        <h5>Payment Method</h5>
                        <div className="payment-method" onClick={() => console.log('select payment method')}>
                            <div className="payment-method__info">
                                <h6 className="bold">American Express</h6>
                                <div>
                                    <Icon icon="amex" />
                                    <p>•••• •••• •••• •••• 1234</p>
                                </div>
                            </div>
                            <div className="payment-method__expand">
                                <Icon icon="more" size="xl" />
                            </div>
                        </div>
                    </div>

                    <Button
                        text={copy.next.replace("{total}", (cost / 100).toFixed(2))}
                    />

                </Elements>
            )}

        </BookingPage>
    )
};
 

export default Checkout;