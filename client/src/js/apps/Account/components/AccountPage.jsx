import React, { useContext, useEffect, useRef } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import Loader from '../../components/Loader';

// Create Component
const AccountPage = ({ children, showLoader, showTitle = true }) => {

    // Destructure State
    const { state, transition } = useContext(AppContext);

    // Crete Refs
    const element = useRef();

    // Component Did Mount
    useEffect(() => {

        if (!element.current || showLoader) return;

        // Set Transition & Transition In
        transition.set(element.current).in();

    }, [showLoader])

    // Return Container
    return (
        <div className="account__content" ref={element}>
            {showLoader ? (
                <div className="account__loader">
                    <Loader />
                </div>
            ) : (
                <>
                    {showTitle && <h2 className="account__title animate-item">Hello <span>Arjun</span></h2>}
                    {children}
                </>
            )}
            
        </div>
    )

};


// Export Component
export default AccountPage;