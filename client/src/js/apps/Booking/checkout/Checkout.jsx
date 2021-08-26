import React, { useContext, useState, useEffect } from 'react';


// Import Context
import AppContext from '../store/context';


// Import Components
import BookingPage from '../components/BookingPage';
import PaymentMethod from '../components/PaymentMethod';
import AddPaymentMethod from './AddPaymentMethod';
import { ConfirmCheckout, SelectPaymentMethod } from './CheckoutSections';


// Import Helpers
import { useObjectState } from '../../helpers/hooks';


// Import Stripe Checkout
import { Elements } from '@stripe/react-stripe-js';
import useStripeCheckout, { stripeOptions } from '../helpers/useCheckout';


// Get Previous View For Navigation
const getPrevView = (current) => {

    switch (current) {
        case 'methods':
            return 'main';
        
        case 'add-card':
            return 'methods';
        
        default:
            return 'main';
    }

}


// Create Checkout Component
const Checkout = () => {

    // Destructure State and create shortcut variables
    const { state: { app }, appCopy, transition } = useContext(AppContext);
    const copy = appCopy.steps[app.step];


    // Load Stripe
    const { stripe, cost, ...payment } = useStripeCheckout();


    // Create State
    const [view, setView] = useState('main');
    const [state, setState] = useObjectState({
        method: {},
        addedMethods: [],
        error: '',
        saveCard: true,
        name: app.user?.name,
        processing: false
    });


    // Update State After Payment Methods Are Loaded
    useEffect(() => {

        if (!payment.methods) return;

        const { default: d, all } = payment.methods;

        if (!d && !all.length) return;

        setState({ method: all[0] });

    }, [payment.methods]);


    // Handle Final Payment Processing
    useEffect(() => {

        if (!payment.status.complete) return;

        // Do something with the status;
        if (!payment.status.complete) return setState({
            processing: false,
            error: copy.errors.fucked
        })

        // Go To Confirmation
        transition.to("Confirmation");

    }, [payment.status.success]);


    // Navigate wiithin checkout
    const changeView = (newView) => {

        return async () => {
            await transition.out();
            await $.delay(150);
            setView(newView);
            await transition.in();
        }
       
    }


    // Handle Card Submit
    const handleCardSubmit = async () => {

        // Start Timer
        setState({
            processing: true,
            error: ''
        });
        const timer = $.timer(1000).start();

        // Process Payment
        const status = await payment.process(state.method.id, null, state.saveCard);

        // Await Timer
        await timer.hold();

        // Update State
        setState({ processing: false });
        payment.update({ status });

    }

    return (
        <BookingPage
            back={view === 'main' ? "Summary" : changeView(getPrevView(view))}
            backText={copy.back}
            showLoader={!stripe}
        >
            {stripe && (
                <Elements options={stripeOptions} stripe={stripe}>

                    {view === 'main' && (
                        <ConfirmCheckout
                            cost={cost}
                            credits={payment.credits}
                            paymentRequest={payment.request}
                            method={state.method}
                            paymentLoading={state.processing}
                            onSubmit={handleCardSubmit}
                            error={state.error}
                        >

                            {state.method.id ? (
                                state.method.type === 'card' ? (
                                    <PaymentMethod
                                        type="main"
                                        label={state.method.name}
                                        icon={state.method.brand}
                                        onClick={changeView('methods')}
                                        isCard
                                        text={state.method.last4}
                                    />
                                ) : (
                                    <PaymentMethod
                                        type="main"
                                        icon={state.method.provider}
                                        onClick={changeView('methods')}
                                        text={state.method.name}
                                    />
                                )
                            ) : (
                                <PaymentMethod
                                    type="main"
                                    onClick={changeView('methods')}
                                    text="Select Payment Method"
                                    isMainBtn
                                />
                            )}

                        </ConfirmCheckout>
                    )}

                    {view === 'methods' && (
                        <SelectPaymentMethod
                            wallets={payment.wallets.enabled}
                            cards={[...payment.methods.all, ...state.addedMethods]}
                            addCardHandler={changeView('add-card')}
                            onSelect={(m) => setState({ method: m })}
                            selected={state.method}
                            changeView={changeView('main')}
                        /> 
                    )}

                    {view === 'add-card' && (
                        <AddPaymentMethod
                            name={state.name}
                            email={app.user?.email}
                            onNameChange={(val) => setState({ name: val })}
                            stripe={stripe}
                            setMethod={(val) => {
                                setState({
                                    method: val,
                                    addedMethods: [...state.addedMethods, val]
                                })
                            }}
                            setSaveCard={(val) => setState({ saveCard: val })}
                            saveCard={state.saveCard}
                            changeView={changeView('main')}
                        />
                    )}
                    

                </Elements>
            )}

        </BookingPage>
    )
};
 

// Export Checkout Component
export default Checkout;