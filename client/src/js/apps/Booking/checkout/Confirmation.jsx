import React, { useContext } from 'react';

// Import App Context
import AppContext from '../store/context'

// Import Components
import BookingPage from '../components/BookingPage';
import { Button } from '../../components/Buttons';


const Confirmation = () => {

    const { 
        state: { reservation: { code },
        app: { user } },
        appCopy,
        page 
    } = useContext(AppContext);

    const copy = appCopy.steps.Confirmation;

    return (

        <BookingPage>
            <div className="booking-view__header animate-children">
                <h3>{copy.title}</h3>
                <h5>{copy.code} {code.toUpperCase()}</h5>
            </div>

            <hr className="booking-view__divider animate-item" />

            <div className="booking-view__section animate-children">
                <p>{copy.email} {user.email}</p>
                <p>{copy.thanks}</p>
                <Button
                    text="View my reservation"
                    onClick={() => window.location.href = `/reservations/${code}`}
                />
            </div>
        </BookingPage>        
    )

};


export default Confirmation;