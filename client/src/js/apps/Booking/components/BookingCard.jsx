// Import React Defaults
import React, { useContext } from 'react';

// Import App Context
import AppContext from '../store/context';

// Import Components
import Loader from '../../components/Loader';
import { Button, IconButton } from '../../components/Buttons'

const aI = "animate-item";

// Create Component
const BookingCard = ({ children, next, back, copy, showLoader, footer, disableExpand }) => {

    const { state } = useContext(AppContext);

    const { title, heading, text} = copy || {};

    return (
        <div className="booking__card">
            <div className="booking-card">

                <div className="booking-card__nav">
                    <IconButton
                        color="white"
                        size="lg"
                        icon="arrow-back"
                        animationClass="no-animate"
                        onClick={back}
                        disabled={!back}
                    />
                    <h6 className="white">{title}</h6>
                    <IconButton
                        color="white"
                        size="lg"
                        icon="expand"
                        animationClass="no-animate"
                        onClick={null}
                        disabled={disableExpand}
                    />
                </div>

                <div className="booking-card__menu">

                </div>

                <div className="booking-card__body">

                    {showLoader ? (
                        <div className="booking-card__loader">
                            <Loader />
                        </div>
                    ) : (
                        <>
                            <div className="booking-card__content">
                                {(heading || text) && (
                                    <div className="booking-card__header">
                                        {heading && <h5 className={aI}>{heading}</h5>}
                                        {text && <p className={aI}>{text}</p>}
                                    </div>
                                )}

                                {children}

                                {footer && (
                                    <div className="booking-card__footer">
                                        <hr className={aI} />
                                        {footer.title && <h6 className={$.join("bold", aI)}>{footer.title}</h6>}
                                        {footer.text && (typeof footer.text === "string" ? (
                                            <p className={$.join("small", aI)}>{footer.text}</p>
                                        ) : footer.text)}
                                    </div>
                                )}
                            </div>
                            
                            <div className="booking-card__next">
                                {next && typeof next === 'object' && (
                                    <Button {...next} />
                                )}
                            </div>
                        </>
                    )}

                </div>

            </div>
        </div>
    )

};


// Export Component
export default BookingCard;