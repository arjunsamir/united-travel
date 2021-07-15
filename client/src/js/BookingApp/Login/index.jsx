import React from 'react';

// Import Atoms
import Image from '../components/atoms/Image'

// Import Helpers
import axios from 'axios';

// Import Views
import AuthProviders from './views/AuthProviders';
import EmailForm from './views/EmailForm';
import ForgotPassword from './views/ForgotPassword';

// Import Custom Hooks
import useObjectState from './hooks/useObjectState';

// Register Views
const views = {
    providers: AuthProviders,
    email: EmailForm,
    forgot: ForgotPassword
}

const Login = ({ allowGuests, onLogin }) => {

    // Create Functions to handle login
    const authenticate = async (endpoint, data) => {

        const res = await axios.post(endpoint, data);

        if (!res?.data?.data?.user) return;

        onLogin && onLogin(res.data.data.user)

    }

    // Set Up State
    const [state, setState] = useObjectState({
        view: 'providers',
        componentState: null
    })

    // Get Current View
    const View = views[state.view];

    return (
        <section className="booking">

            <Image fileName="luggage" />

            <div className="booking__container">

                <View
                    allowGuests={allowGuests}
                    login={authenticate}
                    initialState={state.componentState}
                    navigate={(view, componentState) => setState({
                        view,
                        componentState
                    })}
                />

            </div>

        </section>
    )

}

export default Login;