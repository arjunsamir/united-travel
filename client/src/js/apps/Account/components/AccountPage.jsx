import React, { useContext, useEffect } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import Loader from '../../components/Loader';

// Create Component
const AccountPage = ({ children, showLoader, showTitle = true }) => {

    // Destructure State
    const { transition } = useContext(AppContext);

    // Component Did Mount
    useEffect(() => {

        if (showLoader || !transition.container) return;

        // Set Transition & Transition In
        transition.update().in();

    }, [showLoader, transition.container])

    // Return Container
    return (
        <div className="account__content">
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