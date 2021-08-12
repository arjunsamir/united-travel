// Import React Defaults
import React, { useContext, useRef } from 'react';

// Import App Context
import AppContext from '../store/context';

// Import Other Shit
import { useObjectState } from '../../helpers/hooks';
import anime from 'animejs';

// Import Components
import Loader from '../../components/Loader';
import Icon from '../../components/Icon';
import { Button, IconButton } from '../../components/Buttons'


// Animation Class Shortcut
const aI = "animate-item";


// Open Menu
const openMenu = (e) => {

    const height = $(e).children('#bc-menu').height();

    const tl = anime.timeline({
        easing: 'easeInOutQuad',
    });

    tl.add({
        targets: $(e).children('#bc-expand').e(),
        rotate: [0, 180],
        duration: 250
    });

    tl.add({
        targets: $(e).children('#bc-body').e(),
        translateY: [0, height],
        duration: 300
    }, '-=250');

    return tl.finished;

}

// Close Menu
const closeMenu = (e) => {

    const tl = anime.timeline({
        easing: 'easeInOutQuad',
    });

    tl.add({
        targets: $(e).children('#bc-expand').e(),
        rotate: [180, 0],
        duration: 250
    });

    tl.add({
        targets: $(e).children('#bc-body').e(),
        translateY: 0,
        duration: 300
    }, '-=250');

    return tl.finished;

}


// Create Component
const BookingCard = ({ children, next, back, showLoader, footer, disableExpand }) => {

    // Get App Context
    const { state, dispatch, appCopy } = useContext(AppContext);

    // Get Copy
    const copy = appCopy.steps[state.app.step];
    const { title, heading, text, next: nextCopy } = copy || {};

    // Get Steps
    const { first, dynamic, last } = state.app.steps;
    const steps = [...first, ...dynamic, ...last];
    const stepIndex = steps.findIndex(s => s.name === state.app.step);
    

    // Create Local State
    const [localState, setLocalState] = useObjectState({
        isOpen: false,
        isAnimating: false
    });

    // Create Refs
    const element = useRef();


    // Create Function To Toggle Menu
    const toggleMenu = async () => {

        // Prevent Menu From Opening When Disabled
        if (disableExpand) return;

        // Prevent Double Click
        if (localState.isAnimating) return;
        setLocalState({ isAnimating: true });

        // Open Menu
        if(!localState.isOpen) await openMenu(element.current);
        else await closeMenu(element.current);

        // Set State
        setLocalState({
            isOpen: !localState.isOpen,
            isAnimating: false
        });

    }


    // Navigate
    const navigate = (delta) => {

        // Prevent Dev Errors
        if (!delta) return () => console.warn('No direction defined');

        // Get Target Index
        const target = typeof delta === 'string' ? delta : steps[stepIndex + delta]?.name;

        // Prevent Another Dev Errors
        if (!target) return () => console.warn('This is either the first or last step. Please provide a custom function to run for this step.');

        // Return Navigation Function
        return async () => {
            dispatch({
                type: "SET_APP_STEP",
                payload: target
            });
        }        

    }


    // Create Markup
    return (
        <div className="booking__card" ref={element}>
            <div className="booking-card">

                <div className="booking-card__nav">
                    <IconButton
                        color="white"
                        size="lg"
                        icon="arrow-back"
                        animationClass="no-animate"
                        onClick={navigate(-1)}
                        { ...(back || {})}
                    />
                    <h6 className="white" onClick={toggleMenu}>{title}</h6>
                    <IconButton
                        color="white"
                        size="lg"
                        icon="expand"
                        animationClass="no-animate"
                        disabled={disableExpand}
                        id="bc-expand"
                        onClick={toggleMenu}
                    />
                </div>

                <div id="bc-menu" className={$.join("booking-card__menu", [!localState.isOpen, 'disabled'])}>
                    <hr />
                    <ul className="booking-card__steps">
                        {steps.map((step, i) => (
                            <li
                                key={step.name}
                                className={$.join(
                                    'booking-card__step',
                                    [step.complete, 'complete'],
                                    [!step.active, 'disabled'],
                                    [step.name === state.app.step, 'active']
                                )}
                                onClick={async () => {

                                    // Close The menu
                                    await toggleMenu();

                                    // Navigate to Next Step
                                    await navigate(step.name)();

                                }}
                            >
                                <span>{appCopy.steps[step.name].title}</span>
                                {step.complete && <Icon icon="checkmark" size="sm" />}
                            </li>
                        ))}
                    </ul>
                    
                </div>

                <div id="bc-body" className="booking-card__body">

                    <div
                        className={$.join("booking-card__body-esc", [localState.isOpen, "listening"])}
                        onClick={toggleMenu}
                    />

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
                                    <Button
                                        text={nextCopy}
                                        onClick={navigate(1)}
                                        {...(next || {})}
                                    />
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