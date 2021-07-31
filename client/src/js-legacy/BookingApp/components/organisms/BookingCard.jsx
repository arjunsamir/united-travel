import React, { useRef, useEffect } from 'react';

import { CaratButton } from '../molecules/Buttons';

import { bemify } from '../../helpers/utils'

import gsap from 'gsap';

const transition = (ref, callback) => {
    const tl = gsap.timeline(window.gsapDefaults);
    tl.to(ref, { opacity: 0, duration: .5 });
    callback && tl.eventCallback('onComplete', callback);
}

const BookingCard = ({ children, next, previous, allowed, title, text, showLoader, showError, nextLabel, backLabel, useForm }) => {

    const bc = bemify('booking-card')

    const cardTitle = showError ? 'This is weird...' : title;
    const cardText = showError ? 'Something went wrong. Please try again.' : text;

    const cardForm = useRef();

    useEffect(() => {

        gsap.fromTo(cardForm.current, {opacity: 0}, {opacity: 1, duration: .5})

    }, []);

    const innerContent = showLoader ? (
        <>
            <p>loading...</p>
        </>
    ) : (
        <>
            {cardTitle && <h3 className={bc('title')}>{cardTitle}</h3>}
            {cardText && <p className={bc('text')}>{cardText}</p>}
            {children}
        </>
    );

    return (
        <div className={bc()}>
                    
            <div className={bc("header")}>
                <CaratButton
                    icon="back"
                    order="first"
                    text={backLabel || "Back"}
                    disabled={!(allowed && allowed.find(a => a == 'back' || a == 'previous'))}
                    onClick={() => {
                        transition(cardForm.current, previous)
                    }}
                />
            </div>

            {useForm ? (
                <form className={bc("body")} ref={cardForm} onSubmit={e => e.preventDefault()}>
                    {innerContent}
                </form>
            ) : (
                <div className={bc("body")} ref={cardForm}>{innerContent}</div>
            )}
    
            
    
            <div className={bc("footer")}>
                <CaratButton
                    icon="carat-right"
                    order="last"
                    text={nextLabel || "Next"}
                    disabled={!(allowed && allowed.find(a => a == 'next' || a == 'forward'))}
                    onClick={() => transition(cardForm.current, next)}
                />
            </div>
    
        </div>
    )
    
}

export default BookingCard;
