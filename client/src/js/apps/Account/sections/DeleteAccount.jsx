import React, { useContext } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import { LinkButton } from '../../components/Buttons';

// Create Component
const EditProfile = () => {

    const { state: user, update } = useContext(AppContext);

    return (
        <div className="account__fields animate-children">
            <h5>Delete Your Account</h5>
            <LinkButton
                text={"Delete My Account"}
                animationClass="nill"
            />
        </div>
    )

};


export default EditProfile;