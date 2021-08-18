import React, { useContext, useState, useEffect } from 'react';

// Import Context
import AppContext from '../store/context';

// Import Components
import BookingPage from '../components/BookingPage';


const Checkout = () => {

    // Destructure State and create shortcut variables
    const { state, appCopy } = useContext(AppContext);
    const copy = appCopy.steps[state.app.step];

    // Set Up Local State
    const [loaded, setLoaded] = useState();

    // Load Login Copy
    useEffect(() => {

        const load = async () => {

            // Set Up Vars
            const timer = $.timer(1000).start();

            // Wait For Timer
            await timer.hold();

            // Set Loaded Flag
            setLoaded(true);

        }

        if (!loaded) load();

    }, []);

    return (
        <BookingPage
            back="Summary"
            nextText={copy.next.replace("{total}", "72.50")}
            next={() => {
                console.log('process the payment')
            }}
            showLoader={!loaded}
        >
            <div className="booking-view__header animate-children">
                <h3>{copy.title}</h3>
                <h5>$72.50</h5>
            </div>

            <hr className="booking-view__divider animate-item" />

            <div className="booking-view__block animate-item">
                <p>{copy.notice}</p>
            </div>

        </BookingPage>
    )
};
 

export default Checkout;