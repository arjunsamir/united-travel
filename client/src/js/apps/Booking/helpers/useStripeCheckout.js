import { useEffect, useState, useContext } from 'react';
import AppContext from '../store/context';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import config from '../../data/config';

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

const testData = {
    quote: "611c6bd216d9c70f9a052b4e",
    vehicle: "610b1cdf6c7bf65df87de41d"
}


// Create Payment Processing Function
const processPayment = (stripe, secret) => {

    const errMsg = {
        complete: false,
        message: "Problem confirming card"
    };

    const succesMsg = {
        complete: true
    }

    return async (id, e, saveCard) => {

        const { paymentIntent, error } = await stripe.confirmCardPayment(secret, {
            payment_method: id,
            setup_future_usage: saveCard && 'off_session',
        }, {
            handleActions: false
        });


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
const useStripeCheckout = () => {

    const { state: { reservation: r } } = useContext(AppContext);

    const [data, setData] = useState({});

    useEffect(() => {

        const loadStripeAPI = async () => {

            const timer = $.timer(1000).start();

            // Load Stripe API
            const stripe = await loadStripe(config.stripe.key);

            // Create payment intent on server
            const res = await axios.post('/api/booking/create-payment', {
                quote_id: r.quote || testData.quote,
                vehicle_id: r?.vehicle?._id || testData.vehicle
            });

            // Emergency Return
            if (!res?.data?.cost) return;

            // Destructure Payment Intent
            const { cost, secret, paymentMethods } = res?.data;

            // Create Payment Request For Mobile Wallets
            const paymentRequest = stripe.paymentRequest({
                country: 'US',
                currency: 'usd',
                total: {
                    label: 'Car Reservation Total',
                    amount: cost
                },
                requestPayerName: true,
                requestPayerEmail: true
            });

            // Get Mobile Wallets
            const wallets = await paymentRequest.canMakePayment() || {};

            // Attach Wallet Event Listers
            if (wallets) {

                paymentRequest.on('paymentmethod', e => processPayment(e.paymentMethods, e));

            }

            // Artifical Delay
            await timer.hold();

            // Finally Update The State
            setData({
                stripe,
                secret,
                cost,
                methods: {
                    all: paymentMethods,
                    default: null
                },
                request: paymentRequest,
                wallets,
                processPayment: processPayment(stripe, secret)
            });

        }

        if (!data.stripe) loadStripeAPI();

    }, []);

    return data;

}


// Export the hook
export default useStripeCheckout;