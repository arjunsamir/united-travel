import React, { useContext, useEffect, useRef } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components


// Create Component
const AccountPage = ({ children, showLoader }) => {

    // Destructure State
    const { state, transition } = useContext(AppContext);

    // Crete Refs
    const element = useRef();

    // Component Did Mount
    useEffect(() => {

        if (!element.current) return;

        // Set Transition
        transition.set(element.current);

    }, [])

    // Return Container
    return (
        <div className="account__content" ref={element}>
            <h2 className="account__title animate-item">Hello <span>Arjun</span></h2>
            {children}
        </div>
    )

};


// Export Component
export default AccountPage;