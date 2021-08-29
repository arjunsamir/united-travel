import React, { useContext, useEffect, useState } from 'react';

// Import Context
import AppContext from '../store/AppContext';

// Import Components
import AccountPage from '../components/AccountPage';
import PaymentMethod from '../components/PaymentMethod';

// Import Helpers
import axios from 'axios';


const Wallet = () => {

    // Destructure Global State
    const { state } = useContext(AppContext);

    // Create Local State
    const [isFetching, setIsFetching] = useState(!state.paymentMethods);

    // Load Payment Methods
    useEffect(() => {

        const fetchPaymentMethods = async () => {

            // Create Timer
            const timer = $.timer(1000).start();

            const res = await axios('/users/me/payment-methods');

            console.log(res);

        };

        if (!state.paymentMethods) fetchPaymentMethods();

    }, [])

    return (
        <AccountPage showLoader={isFetching}>
            <PaymentMethod
                label="American Express"
                text="0005"
                icon="amex"
            />
        </AccountPage>
    )

};


export default Wallet;