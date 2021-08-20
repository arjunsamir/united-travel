import React, { useContext } from 'react';

import AppContext from '../store/context'

// Import Components
import BookingPage from '../components/BookingPage';
import { Button } from '../../components/Buttons';


const Confirmation = () => {

    const { state: { reservation: { code } }, appCopy, page } = useContext(AppContext);

    return (

        <BookingPage>
            <div className="booking-view__header animate-children">
                <h3>You're all set!</h3>
                <h5>Confirmation Code: sb377ce</h5>
            </div>

            <hr className="booking-view__divider animate-item" />

            <div className="booking-view__section animate-children">
                <p>A confirmation email has been sent to me@arjunsamir.com</p>
                <p>Thank you for booking with us! We look forward to making your journey a great one.</p>
                <Button
                    text="View my reservation"
                    onClick={() => page.barba.go(`/reservations/${code}`)}
                />
            </div>

        </BookingPage>        
    )

};


export default Confirmation;