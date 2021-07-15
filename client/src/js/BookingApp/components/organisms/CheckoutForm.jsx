import React, { useState, useEffect } from 'react';

// Import Utilities
import { DevError } from '../../helpers/Errors';
import { toUSD } from '../../helpers/utils';
import axios from 'axios';

import { CardNumberElement, CardExpiryElement, CardCvcElement, PaymentRequestButtonElement, useElements, useStripe } from '@stripe/react-stripe-js';

// Import Hooks
import useObjectState from '../../Login/hooks/useObjectState';

// Import Molecules
import Field from '../molecules/Field';

// Import Organisms
import Input from '../organisms/Input';

const style = {
	base: {
        // color: "rgb(51, 51, 51)",
        color: "#fff",
        fontWeight: 400,
        fontFamily: "Geomanist, sans-serif",
        fontSize: "18px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "rgb(51, 51, 51)" },
        "::placeholder": { color: "#CFCFCF" }
    },
    // invalid: {
    // 	iconColor: "#ffc7ee",
    // 	color: "#ffc7ee"
    // }
}

const CheckoutForm = ({ onSuccess }) => {

    // Initialize Stripe Hooks
    const stripe = useStripe();
    const elements = useElements();

    // Initialize State
    const [state, setState] = useObjectState({
        paymentRequest: null,
        paymentMethods: [],
        secret: null,
        error: "",
        zip: "",
        name: "",
        amount: 0,
        cost: 0,
        saveCard: false,
        valid: true
    });


    const processPayment = async (id, e) => {

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(state.secret, {
            payment_method: id,
            setup_future_usage: state.saveCard ? 'off_session' : null
        }, { handleActions: false });

        if (confirmError) {
            e && e.complete('fail');
            console.log('Error', confirmError)
            setState({ error: "Problem confirming Card" })
            return;
        }

        else e && e.complete('success');

        if (paymentIntent.status === 'requires_action') {

            const { error } = await stripe.confirmCardPayment(state.secret)

            if (error) setState({ error: "Problem confirming Card" })
            else onSuccess && onSuccess()

        }
        else {
            onSuccess && onSuccess()
        }

    }


    // Create Form Submit Handler
    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardNumberElement),
                billing_details: {
                    address: {
                        postal_code: state.zip
                    },
                    email: null,
                    name: state.name
                }
            });
    
            if (error) throw new DevError(error, 'Error creating payment method');

            await processPayment(paymentMethod.id);

        }

        catch (err) {
            console.log(err)
        }

    }


    // Handle Card Input For Validation
    const handleCardInput = (e) => {
        console.log(e)
    }


    // Create Google/Apple Pay Buttons
    useEffect(() => {

        const initPaymentRequest = async () => {
            const pr = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Ride Total',
                    amount: state.amount
                },
                requestPayerName: true,
                requestPayerEmail: true
            })
    
            const enabled = await pr.canMakePayment();

            if (!enabled) return;

            // Attach Listener
            pr.on('paymentmethod', e => processPayment(e.paymentMethod.id, e));

            // Update State
            setState({ paymentRequest: pr });

        }

        if (stripe && state.secret && !state.paymentRequest) initPaymentRequest();

    }, [stripe, state.secret, state.paymentRequest])


    // Create Server Side Payment Intent
    useEffect(() => {

        const getPaymentIntent = async () => {

            const res = await axios.post('/api/booking/create-payment', {
                id: "60d4906c0e8469d871b03b84"
            })

            if (!res.data.amount) return setState({ error: 'Something went wrong...' });

            const { amount, cost, secret, paymentMethods } = res.data;

            console.log(paymentMethods)

            setState({ amount, cost, secret, paymentMethods })

        }

        if (!state.secret) getPaymentIntent();

    }, [])


    // Return Component
    return (
        <form onSubmit={handleSubmit} className="booking-card__fieldset">

            {state.paymentRequest && (
                <div className="ctn">
                    <PaymentRequestButtonElement options={{ paymentRequest: state.paymentRequest }} />
                </div>
            )}

            {state.paymentMethods.length && (
                <div>
                    {state.paymentMethods.map(card => (
                        <button 
                            className="btn wide filled icon-fill lt-dark lt-hover-primary dk-primary dk-hover-opacity-75"
                            type="button"
                            key={`${card.brand}-${card.digits}`}
                            onClick={() => processPayment(card.id)}
                        >
                            {card.brand} ending in {card.digits}
                        </button>
                    ))}
                </div>
            )}

            <Input icon="person">
                <Field
                    label="Name on card"
                >
                    <input
                        type="text"
                        value={state.name}
                        onChange={e => setState({ name: e.target.value })}
                        placeholder="Juan Pablo"
                    />
                </Field>
            </Input>

            <Input icon="person">
                <Field
                    grow="1"
                    label="Card Information"
                >
                    <CardNumberElement
                        options={{style}}
                        onChange={handleCardInput}
                    />
                </Field>
            </Input>

            <Input icon="lock">

                <Field label="Expiration" grow="1">
                    <CardExpiryElement options={{style}} />
                </Field>

                <Field label="Security" grow="2">
                    <CardCvcElement options={{style}} />
                </Field>

                <Field label="Zip" grow="1">
                    <input
                        type="text"
                        value={state.zip}
                        onChange={e => setState({ zip: e.target.value })}
                        placeholder="00000"
                    />
                </Field>

            </Input>


            <div style={{
                margin: '2rem 0'
            }}>
                <input
                    id="save-card-for-later"
                    type="checkbox"
                    checked={state.saveCard}
                    onChange={e => setState({ saveCard: e.target.checked })}
                />
                <label htmlFor="save-card-for-later" style={{
                    color: 'var(--text-light)',
                    display: 'inline'
                }}>Save Card For Later</label>
            </div>
           

            <button type="submit" className={`btn wide filled icon-fill lt-dark lt-hover-primary dk-primary dk-hover-opacity-75${state.valid ? '' : ' disabled'}`}>Pay {toUSD(state.cost)}</button>
        </form>
    )

}

export default CheckoutForm;