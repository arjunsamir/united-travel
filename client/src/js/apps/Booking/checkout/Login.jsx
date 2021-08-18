import React, { useContext, useState, useEffect } from 'react';

// Import Context
import AppContext from '../store/context';

// Import Helpers
import axios from 'axios';

// Import Components
import BookingPage from '../components/BookingPage';
import LoginApp from '../../Login/App';


const Login = () => {

    // Destructure State and create shortcut variables
    const { state, appCopy, transition, updateApp, page } = useContext(AppContext);
    const copy = appCopy.steps[state.app.step];

    // Set Up Local State
    const [showApp, setShowApp] = useState(false);
    const [loginCopy, setLoginCopy] = useState();

    // Load Login Copy
    useEffect(() => {

        const loadCopy = async () => {

            // Set Up Vars
            const timer = $.timer(1000).start();

            // Load Copy
            const res = await axios(`/api/copy/login/${window.locale}`);

            // Wait For Timer
            await timer.hold();

            // Set Loaded Flag
            setLoginCopy(res?.data);

        }

        if (!loginCopy) loadCopy();

    }, []);

    return !showApp ? (
        <BookingPage
            back="Summary"
            next={async () => {
                if (state.app.isLoggedIn) return transition.to("Checkout")
                state.app.map.hide();
                await transition.out();
                await $.delay(400);
                setShowApp(true);
            }}
            showLoader={!loginCopy}
        >
            <div className="booking-view__header animate-children">
                <h3>{copy.title}</h3>
                <p>{copy.text}</p>
            </div>

        </BookingPage>
    ) : (
        <LoginApp
            copy={loginCopy}
            back={() => setShowApp(false)}
            onLogin={async (user) => {
                await page.loginRefresh();
                updateApp("USER", user)
                await $.delay(100);
                updateApp("STEP", "Checkout")
            }}
        />
    )
};
 

export default Login;