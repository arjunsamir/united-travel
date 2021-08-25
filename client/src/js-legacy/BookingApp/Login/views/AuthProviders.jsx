// Import React
import React from 'react';

// Import Atoms
import Icon from '../../components/atoms/Icon';

// Import Molecules
import { CaratButton } from '../../components/molecules/Buttons';

// Import Organisms
import AuthCard from '../../components/organisms/AuthCard';

// Import Hooks
import useOAuth from '../hooks/useOAuth';

// Create Component
const AuthProviders = ({ login, allowGuests, navigate }) => {

    const { loaded, useAuthProvider } = useOAuth(login);

    return (
        <AuthCard
            title={<>Welcome <span>Traveller</span></>}
            showLoader={!loaded}
        >

            <div className="booking-card__fieldset">

                <button type="button" id="google-auth-btn" className="btn filled icon-fill wide google hover-opacity-75" onClick={loaded && useAuthProvider('google')}>
                    <Icon icon="google" />
                    <span>Continue with Google</span>
                </button>

                <button type="button" id="facebook-auth-btn" className="btn filled icon-fill wide facebook hover-opacity-75" onClick={loaded && useAuthProvider('facebook')}>
                    <Icon icon="facebook" />
                    <span>Continue with Facebook</span>
                </button>

                <button type="submit" className="btn wide filled icon-fill lt-dark lt-hover-primary dk-primary dk-hover-opacity-75" onClick={() => navigate('email')}>
                    <Icon icon="email" />
                    <span>Continue with email</span>
                </button>

                <CaratButton
                    icon="carat-right"
                    order="last"
                    text="Continue as guest"
                    disabled={!allowGuests}
                    onClick={() => console.log('continue as guest')}
                />
                
            </div>

        </AuthCard>
    )

}

export default AuthProviders;