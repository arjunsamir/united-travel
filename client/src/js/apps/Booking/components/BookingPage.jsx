// Import React Itsself
import React, { useContext, useEffect, useRef } from 'react';

// Import Context
import AppContext from '../store/context';

// Impport Components
import BookingLoader from './BookingLoader';
import { BackButton, Button } from '../../components/Buttons';

const BookingPage = ({ children, showLoader, back, next, backText, nextText }) => {

    const { state: { app }, appCopy, transition } = useContext(AppContext);
    const copy = appCopy.steps[app.step];

    const element = useRef();

    // Set Up Transition
    useEffect(() => {
        transition.set({ container: element.current, animation: 'view' });
    })


    // Apply UseEffect
    useEffect(() => {

        if (!showLoader) {
            app.map.show()
            transition.in('in', 400);
        }
        else {
            app.map.hide()
        }

    }, [showLoader]);

    return (
        <div ref={element}>
            {showLoader ? <BookingLoader /> : (
                <div className="booking__container">

                    <div className="booking-view">

                        <div className="booking-view__content">
                            {back && (<BackButton
                                text={backText || copy.back}
                                onClick={typeof back === 'string' ? (() => transition.to(back)) : back}
                            />)}

                            {children}

                            {next && (<Button
                                text={nextText || copy.next}
                                onClick={typeof next === 'string' ? (() => transition.to(next)) : next}
                            />)}
                        </div>  

                    </div>

                </div>
            )}
        </div>
    )
        
}

export default BookingPage;