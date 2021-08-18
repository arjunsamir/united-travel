import React, { useContext, useEffect } from 'react';


// Import Context
import AppContext from '../store/context';


// Import Components
import BookingPage from '../components/BookingPage';
import { Button } from '../../components/Buttons';
import PaymentMethod from '../components/PaymentMethod';
import { ConfirmCheckout, SelectPaymentMethod } from './CheckoutSections';


// Import Helpers
import { useObjectState } from '../../helpers/hooks';


// Import Stripe Checkout
import { Elements } from '@stripe/react-stripe-js';
import useStripeCheckout, { stripeOptions } from '../helpers/useStripeCheckout';



// Create Checkout Component
const Checkout = () => {

    // Destructure State and create shortcut variables
    const { state: { app }, appCopy, transition } = useContext(AppContext);
    const copy = appCopy.steps[app.step];

    // Load Stripe
    const { stripe, cost, ...payment } = useStripeCheckout();

    // Create State
    const [state, setState] = useObjectState({
        method: {},
        error: '',
        saveCard: null,
        name: app.user?.name,
        view: 'main'
    });

    const changeView = (view) => {

        return async () => {
            await transition.out();
            await $.delay(150);
            setState({ view });
            await transition.in();
        }
       
    }

    console.log(payment);
    

    return (
        <BookingPage
            back={state.view === 'main' ? "Summary" : changeView('main')}
            backText={state.view === 'main' ? copy.back : "Back"}
            showLoader={!stripe}
        >
            {stripe && (
                <Elements options={stripeOptions} stripe={stripe}>

                    {state.view === 'main' && (
                        <ConfirmCheckout
                            cost={cost.dollars}
                            paymentRequest={payment.request}
                            wallet={state.method.wallet}
                        >

                            <PaymentMethod
                                type="main"
                                label="American Express"
                                icon="amex"
                                onClick={changeView('methods')}
                                isCard
                                text="1234"
                            />

                        </ConfirmCheckout>
                    )}

                    {state.view === 'methods' && (
                        <SelectPaymentMethod
                            wallets={[]}
                            cards={[]}
                        /> 
                    )}
                    

                </Elements>
            )}

        </BookingPage>
    )
};
 

export default Checkout;