import { useEffect, useContext } from 'react';
import AppContext from '../store/context';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import config from '../../data/config';
import { useObjectState } from '../../helpers/hooks';
import { getBrand, getWalletProvider } from './cardBrands';

// Create Stripe Options
export const stripeOptions = {
    fonts: [
        {
            family: 'Silka',
            src: `url(${window.location.origin}/fonts/silka/medium/silka-medium-webfont.woff2)`,
            weight: '400'
        }
    ]
};

export const stripeStyle = {
    base: {
        color: "#333333",
        fontWeight: 400,
        fontFamily: "Silka, sans-serif",
        fontSize: "18px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": { color: "#333" },
        "::placeholder": { color: "#C6CAD2" }
    }
}


export const walletButtonStyle = {
    paymentRequestButton: {
        type: "book",
        theme: "dark",
        height: "64px"
    }
}

const testData = {
    quote: "611c6bd216d9c70f9a052b4e",
    vehicle: "610b1cdf6c7bf65df87de41d"
}


// Create Payment Processing Function
const processPayment = (stripe, secret) => {

    const errMsg = {
        complete: true,
        success: false,
        message: "Problem confirming card"
    };

    const succesMsg = {
        complete: true,
        success: true
    }

    return async (id, e, saveCard) => {

        const { paymentIntent, error } = await stripe.confirmCardPayment(secret, {
            payment_method: id,
            setup_future_usage: saveCard && 'off_session',
        }, {
            handleActions: false
        });

        console.log(paymentIntent, error);


        if (error) {
            e && e.complete('fail'); 
            return errMsg;
        }

        else e && e.complete('success');

        if (paymentIntent.status === 'requires_action') {

            const { error } = await stripe.confirmCardPayment(secret);
            return error ? errMsg : succesMsg;

        }

        else return succesMsg;

    }

};



// Ceraete The Hook
const useCheckout = () => {

    const { state: { reservation: r }, update } = useContext(AppContext);

    const [state, setState] = useObjectState({
        status: {},
        cost: {
            total: {},
            subtotal: {}
        },
        credits: {}
    });

    useEffect(() => {

        const loadStripeAPI = async () => {

            const timer = $.timer(850).start();

            // Load Stripe API
            const stripe = await loadStripe(config.stripe.key);

            // Create payment intent on server
            const res = await axios.post('/api/booking/create-payment', {
                service_type: r.serviceType,
                flight: { ...r.flight, airport: r.flight.airport.name },
                cruise: { ...r.cruise, port: r.cruise.port.name },
                origin: r.origin,
                destination: r.destination,
                schedule: r.schedule,
                route: {
                    distance: r.route?.distance?.text,
                    eta: r.route?.eta?.text,
                },
                passengers: {
                    total: r.passengers,
                    frontSeats: r.childSeats.front,
                    rearSeats: r.childSeats.rear,
                    boosterSeats: r.childSeats.booster,
                },
                vehicle: r?.vehicle?._id || testData.vehicle,
                notes: r.notes,
                quote: r.quote || testData.quote
            });

            // Emergency Return
            if (!res?.data?.total) return;

            // Destructure Payment Intent
            const { total, sub_total, secret, paymentMethods, credits, code } = res?.data;

            // Update Global State
            update("CODE", code);

            // Create Payment Request For Mobile Wallets
            const paymentRequest = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Car Reservation Total',
                    amount: total
                },
                requestPayerName: true,
                requestPayerEmail: true
            });

            // Get Mobile Wallets
            const wallets = await paymentRequest.canMakePayment() || {};

            // Attach Wallet Event Listers
            if (wallets) {

                paymentRequest.on('paymentmethod', async (e) => {
                    const status = await processPayment(stripe, secret)(e.paymentMethod.id, e);
                    setState({ status });
                });

            }

            // Artifical Delay
            await timer.hold();
            await $.delay(150);


            // Finally Update The State
            setState({
                stripe,
                secret,
                cost: {
                    total: {
                        cents: total,
                        dollars: (total / 100).toFixed(2)
                    },
                    subtotal: {
                        cents: sub_total,
                        dollars: (sub_total / 100).toFixed(2)
                    }
                },
                credits: {
                    cents: credits,
                    dollars: (credits / 100).toFixed(2),
                },
                methods: {
                    all: paymentMethods.map(card => ({
                        brand: card.brand,
                        last4: card.digits,
                        id: card.id,
                        name: getBrand(card.brand),
                        type: 'card'
                    })),
                    default: null
                },
                request: paymentRequest,
                wallets: {
                    ...wallets,
                    enabled: Array.from(Object.entries(wallets)).map(([key, val]) => ({
                        provider: key.replace(/[A-Z]/g, m => "-" + m.toLowerCase()),
                        enabled: val,
                        id: key,
                        name: getWalletProvider(key),
                        type: 'wallet',
                    })).filter(itm => itm.enabled),
                },
                process: processPayment(stripe, secret),
                update: setState
            });

        }

        if (!state.stripe) loadStripeAPI();

    }, []);

    return state;

}


// Export the hook
export default useCheckout;