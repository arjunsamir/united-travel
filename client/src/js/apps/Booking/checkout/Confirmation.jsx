import React, { useContext } from 'react';

import AppContext from '../store/context'

// Import Components
import BookingPage from '../components/BookingPage';


const Confirmation = ({}) => {

    const { state, appCopy } = useContext(AppContext);

    return (

        <BookingPage>
            <div className="booking-view__header">
                <h4>You're all set!</h4>
            </div>
        </BookingPage>        
    )

};


export default Confirmation;