import React, { useRef, useEffect } from 'react';

import { CaratButton } from '../molecules/Buttons';

import { bemify } from '../../helpers/utils'

import gsap from 'gsap';

const transition = (ref, callback) => {
    const tl = gsap.timeline(window.gsapDefaults);
    tl.to(ref, { opacity: 0, duration: .5 });
    tl.eventCallback('onComplete', () => {
        callback && callback();

    });
}

const AuthCard = ({ children, back, title, text, showLoader, showError }) => {

    const bc = bemify('booking-card')

    const cardTitle = showError ? 'This is weird...' : title;
    const cardText = showError ? 'Something went wrong. Please try again.' : text;

    const cardForm = useRef();

    useEffect(() => {

        gsap.fromTo(cardForm.current, {opacity: 0}, {opacity: 1, duration: .5})

    }, []);

    return (
        <div className={bc()}>
                    
            <div className={bc("header")}>
                {back && <CaratButton
                    icon="back"
                    order="first"
                    text="Back"
                    onClick={() => {
                        // transition(cardForm.current, back)
                        back();
                    }}
                />}
            </div>
    
            <div className={bc("body")} ref={cardForm}>
                {showLoader ? (
                    <>
                        <p>loading...</p>
                    </>
                ) : (
                    <>
                        {cardTitle && <h3 className={bc('title')}>{cardTitle}</h3>}
                        {cardText && <p className={bc('text')}>{cardText}</p>}
                        {children}
                    </>
                )}
                
            </div>

            <div className={bc("footer")}>

            </div>
    
        </div>
    )
    
}

export default AuthCard;
