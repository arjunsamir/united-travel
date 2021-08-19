import React, { useContext } from 'react';
import AppContext from '../store/context';

// Import Components
import { Button } from '../../components/Buttons';
import PaymentMethod from '../components/PaymentMethod';

// Import Helpers
import { getWalletProvider } from '../helpers/cardBrands';


// Import Stripe Components
import {
    PaymentRequestButtonElement as Walletbutton,
} from '@stripe/react-stripe-js';



// Creat First Page
export const ConfirmCheckout = ({ children, cost, paymentRequest, wallet, paymentReady, onSubmit, paymentLoading }) => {

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
                    disabled={!paymentReady}
                    onClick={onSubmit}
                    showLoader={paymentLoading}
                />
            )}

        </>
    )
    
};


// Create Second Page
export const SelectPaymentMethod = ({ wallets, cards, selected, onSelect, addCardHandler }) => {

    const { state: { app: { step } }, appCopy: { steps } } = useContext(AppContext);
    const copy = steps[step].views.methods;

    return (
        <>
            <div className="booking-view__header animate-children">
                <h3>{copy.title}</h3>
            </div>

            <hr className="booking-view__divider animate-item" />

            {wallets && wallets.length > 0 && (
                <div className="booking-view__section animate-children">
                    <h5>{copy.wallets}</h5>
                    {wallets.map(wallet => (
                        <PaymentMethod
                            key={wallet.provider}
                            type="option"
                            icon={wallet.provider}
                            text={getWalletProvider(wallet.provider)}
                            selected={selected === wallet.provider}
                        />
                    ))}
                    
                </div>
            )}

            <div className="booking-view__section animate-children">
                <h5>{copy.cards}</h5>
                {(cards && cards.length > 0) ? (cards.map(card => (
                    <PaymentMethod
                        key={card.id}
                        icon={card.brand}
                        type="option"
                        label={card.name}
                        text={card.last4}
                        isCard
                        selected={card.id === selected.id}
                    />

                ))) : (
                    <p>{copy.text}</p>
                )}
                <PaymentMethod
                    type="button"
                    text={copy.add}
                    onClick={addCardHandler}
                />
            </div>

            <Button
                text={selected.id ?
                    copy.button.enabled.replace('{method}', `${selected.name} ${selected.last4 || ''}`.trim()) :
                    copy.button.disabled
                }
                disabled={!selected.id}
            />
        </>
    )
};