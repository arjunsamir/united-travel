import React, { useContext } from 'react';
import AppContext from '../store/context';

// Import Components
import { Button } from '../../components/Buttons';
import Icon from '../../components/Icon';
import PaymentMethod from '../components/PaymentMethod';


// Import Stripe Components
import { walletButtonStyle as style } from '../helpers/useCheckout';
import {
    PaymentRequestButtonElement as Walletbutton,
} from '@stripe/react-stripe-js';



// Creat First Page
export const ConfirmCheckout = ({ children, cost, credits, paymentRequest, method, onSubmit, paymentLoading, error }) => {

    const { state: { app: { step } }, appCopy: { steps } } = useContext(AppContext);
    const copy = steps[step];

    return (
        <>
            <div className="booking-view__header animate-children">
                <h3>{copy.title}</h3>
                {credits.cents ? (
                    <div>
                        <h5><span>${cost.subtotal.dollars}</span> ${cost.total.dollars}</h5>
                        <p className="small bold">${credits.dollars} {copy.credit}</p>
                    </div>
                ) : (
                    <h5>${cost.subtotal.dollars}</h5>
                )}
                
            </div>

            <hr className="booking-view__divider animate-item" />

            <div className="booking-view__block animate-item">
                <p>{copy.notice}</p>
            </div>
            
            <div className="booking-view__section animate-children">
                <h5>{copy.method}</h5>
                {children}
            </div>

            {method.type === 'wallet' ? (
                <div className="animate-item">
                    <Walletbutton options={{ paymentRequest, style }} />
                </div>
            ) : (
                <Button
                    text={copy.next.replace("{total}", cost.total.dollars)}
                    disabled={!method.id}
                    onClick={onSubmit}
                    showLoader={paymentLoading}
                />
            )}

            {error && (
                <div className="input">
                    <div className="input__errors animate-children">
                        <div className="input__error">
                            <Icon icon="error" size="sm" />
                            <p className="small bold">{error}</p>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
    
};


// Create Second Page
export const SelectPaymentMethod = ({ wallets, cards, selected, onSelect, addCardHandler, changeView }) => {

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
                            text={wallet.name}
                            selected={selected.id === wallet.id}
                            onClick={() => onSelect(wallet)}
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
                        onClick={() => onSelect(card)}
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
                onClick={changeView}
            />
        </>
    )
};