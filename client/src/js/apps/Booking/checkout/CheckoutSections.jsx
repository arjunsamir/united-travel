import React, { useContext } from 'react';
import AppContext from '../store/context';

// Import Components
import { Button } from '../../components/Buttons';
import PaymentMethod from '../components/PaymentMethod';

// Import Stripe Components
import {
    PaymentRequestButtonElement as Walletbutton
} from '@stripe/react-stripe-js';


export const ConfirmCheckout = ({ children, cost, paymentRequest, wallet }) => {

    const { state: { app: { step } }, appCopy: { steps } } = useContext(AppContext);
    const copy = steps[step];
    
    return (
        <>
            <div className="booking-view__header animate-children">
                <h3>{copy.title}</h3>
                <h5>${cost}</h5>
            </div>

            <hr className="booking-view__divider animate-item" />

            <div className="booking-view__block animate-item">
                <p>{copy.notice}</p>
            </div>
            
            <div className="booking-view__section animate-children">
                <h5>{copy.method}</h5>
                {children}
            </div>

            {wallet ? (
                <div className="animate-item">
                    <Walletbutton options={{ paymentRequest }} />
                </div>
            ) : (
                <Button
                    text={copy.next.replace("{total}", cost)}
                />
            )}

        </>
    )
    
};


export const SelectPaymentMethod = ({ wallets, cards, onSelect }) => {
    return (
        <>
            <div className="booking-view__header animate-children">
                <h3>Select Payment Method</h3>
            </div>

            <hr className="booking-view__divider animate-item" />

            {wallets && wallets.length > 0 && (
                <div className="booking-view__section animate-children">
                    <h5>Digital Wallets</h5>
                    <PaymentMethod
                        type="button"
                        text="Add Credit/Debit Card"
                    />
                </div>
            )}

            <div className="booking-view__section animate-children">
                <h5>Your Credit/Debit Cards</h5>
                <PaymentMethod
                    type="button"
                    text="Add new card"
                />
            </div>

            <Button
                text="Select to continue"
                disabled
            />
        </>
    )
}