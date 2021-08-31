import React, { useContext, useEffect, useState, useRef } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountPage from '../components/AccountPage';
import PaymentMethod from '../components/PaymentMethod';
import RideCredit from '../components/RideCredit';
import Modal from '../../components/Modal';
import { Button } from '../../components/Buttons';

// Import Helpers
import axios from 'axios';
import { getBrand } from '../../helpers/cardBrands';


const Wallet = () => {

    // Destructure Global State
    const { state: { paymentMethods, credits }, update } = useContext(AppContext);

    // Create Local State
    const [isFetching, setIsFetching] = useState(!paymentMethods);
    const [isLoading, setIsLoading] = useState(false);
    const [currentCard, setCurrentCard] = useState(false);

    // Create Refs
    const modal = useRef();

    // Define Click Handler
    const removeCard = async () => {

        setIsLoading(true);
        const timer = $.timer(1000).start();

        const res = await axios.delete(`/users/me/payment-methods/${currentCard.id}`)

        await timer.hold();

        setIsLoading(false);
        update("payment_methods")(res.data?.paymentMethods || []);
        modal.current.close();

    }

    // Load Payment Methods
    useEffect(() => {

        const fetchPaymentMethods = async () => {

            // Create Timer
            const timer = $.timer(1000).start();

            // Make Request
            const res = await axios('/users/me/payment-methods');

            // Wait For Delay
            await timer.hold();

            // Set State
            update("payment_methods")({
                paymentMethods: res.data?.paymentMethods || [],
                credits: res.data?.credits || []
            });
            setIsFetching(false);

        };

        if (!paymentMethods) fetchPaymentMethods();

    }, [])

    console.log(credits);


    return (
        <AccountPage showLoader={isFetching}>

            <div className="account__fields">
                <h5 className="animate-item">Saved Cards</h5>
                {paymentMethods && paymentMethods.length > 0 && paymentMethods.map(card => (
                    <PaymentMethod
                        key={card.id}
                        card={card}
                        onClick={() => setCurrentCard(card)}
                    />
                ))}

            </div>

            <div className="account__fields animate-children">
                <h5>Add Payment method</h5>
                <p className="small">Currently payment methods can only be added during checkout. We're sorry for the inconvinence.</p>
            </div>
            
            <div className="account__fields animate-children">
                <h5>Ride Credits</h5>
                {credits && credits.length > 0 && credits.map((credit, i) => (
                    <RideCredit
                        key={credit?.id || i}
                        credit={credit}
                    />
                ))}
            </div>

            <Modal
                isOpen={!!currentCard}
                close={setCurrentCard}
                preventClose={isLoading}
                closeRef={modal}
            >
                <div className="account__modal animate-children">
                    <h4>Remove Payment Method</h4>
                    <p>This will remove your card from your account permenantly.</p>
                    <Button
                        text={`Remove ${getBrand(currentCard.brand)} ${currentCard.digits}`}
                        showLoader={isLoading}
                        animationClass="no-animate"
                        onClick={removeCard}
                    />
                </div>
            </Modal>
            
        </AccountPage>
    )

};


export default Wallet;