import React, { useContext, useState } from 'react';
import AppContext from '../store/context';

// Import Components
import { Button } from '../../components/Buttons';
import Input from '../../components/Input';
import Icon from '../../components/Icon';
import Checkbox from '../../components/Checkbox';

// Import Helpers
import { useObjectState } from '../../helpers/hooks';
import { getBrand } from '../helpers/cardBrands';


// Import Stripe Components
import { stripeStyle as style } from '../helpers/useCheckout';
import { CardElement, useElements } from '@stripe/react-stripe-js';


// Create Third Page
export const AddPaymentMethod = ({ email, name, onNameChange, stripe, setMethod, changeView, saveCard, setSaveCard }) => {

    // Create Stripe Elements
    const elements = useElements();


    // Get State copy
    const { state: { app: { step } }, appCopy: { steps } } = useContext(AppContext);
    const copy = steps[step];
    const viewCopy = copy.views["add-card"];


    // Create Local State
    const [state, setState] = useObjectState({
        cardFocused: false,
        cardError: false,
        cardComplete: false,
        cardBrand: '',
        nameErrors: [],
        showLoader: false
    });


    // Create Submission Handler
    const handleSubmit = async () => {

        // Show Loader
        setState({ showLoader: true });

        // Start Timer
        const timer = $.timer(1000).start();

        // Add Payment Method
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
            billing_details: {
                email,
                name
            }
        });

        // Catch Error
        if (error) return setState({ cardError: 'failed' });

        // Artificial Delay
        await timer.hold();

        // Set Method and change view
        const { id, type, card: { brand, last4 } } = paymentMethod;
        setMethod({
            id,
            type,
            brand,
            last4,
            name: getBrand(brand)
        });

        // Change View
        changeView()

    }


    // Render Component
    return (
        <>
            <div className="booking-view__header animate-children">
                <h3>{viewCopy.title}</h3>
            </div>

            <hr className="booking-view__divider animate-item" />

            <div className="booking-view__form">

                <Input
                    id="user-full-name"
                    type="name"
                    icon="person-circle"
                    label={copy.labels.name}
                    placeholder={viewCopy.placeholder}
                    value={name}
                    onChange={onNameChange}
                    errors={state.nameErrors}
                />

                <div className="input animate-children">
                    <div className={$.join("input__input", [state.cardFocused, "focused"], [state.cardError, "has-error"])}>
                        <div className="input__stripe">
                            <label>{copy.labels.card}</label>
                            <div className="input__stripe-container">
                                <CardElement
                                    options={{ style }}
                                    onChange={(e) => setState({
                                        cardError: e.error?.code,
                                        cardComplete: e.complete,
                                        cardBrand: e.brand
                                    })}
                                    onFocus={() => setState({ cardFocused: true })}
                                    onBlur={() => setState({ cardFocused: false })}
                                />
                            </div>
                        </div>
                    </div>
                    {state.cardError && (
                        <div className="input__errors">
                            <div className="input__error">
                                <Icon icon="error" size="sm" />
                                <p className="small bold">{copy.errors[state.cardError] || copy.errors.default}</p>
                            </div>
                        </div>
                    )}
                </div>


                <Checkbox
                    id="save-payment-method"
                    label={viewCopy.save}
                    checked={saveCard}
                    onChange={setSaveCard}
                />

            </div>
            <div className="booking-view__form">

                <Button
                    text={viewCopy.button}
                    disabled={!!(!state.cardComplete || state.nameErrors.length)}
                    showLoader={state.showLoader}
                    onClick={handleSubmit}
                />

            </div>
        </>
    )

}


export default AddPaymentMethod;