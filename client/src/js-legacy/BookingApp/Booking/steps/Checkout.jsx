// Import Defaults
import React, { useContext, useEffect, useState } from 'react';

// Import Context
import { AppContext } from '../../store';

// Import Organisms
import BookingCard from '../../components/organisms/BookingCard';
import CheckoutForm from '../../components/organisms/CheckoutForm';

// Import Config
import config from '../../data/config';

// Import Stripe Things
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const options = {
    fonts: [
        {
            family: 'Geomanist',
            src: `url(${window.location.origin}/fonts/regular/geomanist-regular-webfont.woff)`,
            weight: '400'
        }
    ]
}

const Checkout = ({ updateState, navigateTo }) => {

    // Import State & Dispatch
    const { state } = useContext(AppContext);

    // Initialize Local State
    const [stripe, setStripe] = useState()

    // Load Stripe API
    useEffect(() => {

        const loadStripeAPI = async () => {

            const api = await loadStripe(config.stripe.key);

            setStripe(api);

        }

        if (!stripe) loadStripeAPI();

    }, [])
    
    // Return Component
    return (
        <BookingCard
            title="Checkout"
            allowed={['previous']}
            previous={() => navigateTo('summary')}
            showLoader={!stripe}
        >
            {stripe && (
                <Elements options={options} stripe={stripe}>
                    <CheckoutForm onSuccess={() => navigateTo('confirmation')} />
                </Elements>
            )}
            

        </BookingCard>
    )

}

export default Checkout;