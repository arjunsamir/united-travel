import React from 'react';

import { CaratButton } from '../molecules/Buttons';

import { bemify } from '../../helpers/utils'

const BookingCard = ({ children, next, previous, allowed, title, text, showLoader, showError }) => {

    const bc = bemify('booking-card')

    const cardTitle = showError ? 'This is weird...' : title;
    const cardText = showError ? 'Something went wrong. Please try again.' : text;

    return (
        <div className={bc()}>
                    
            <div className={bc("header")}>
                <CaratButton
                    icon="back"
                    order="first"
                    text="Back"
                    disabled={!(allowed && allowed.find(a => a == 'back' || a == 'previous'))}
                    onClick={previous}
                />
            </div>
    
            <form className={bc("body")}>
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
                
            </form>
    
            <div className={bc("footer")}>
                <CaratButton
                    icon="carat-right"
                    order="last"
                    text="Next Step"
                    disabled={!(allowed && allowed.find(a => a == 'next' || a == 'forward'))}
                    onClick={next}
                />
            </div>
    
        </div>
    )
    
}

export default BookingCard;
