import React from 'react';

// Import Components
import Icon from '../../components/Icon';


const PaymentMethod = ({ onClick, label, icon, text }) => {

    return (
        <div className="payment-method no-pointer animate-item">
            <div className="payment-method__info">
                <h6>{label}</h6>
                <div>
                    <Icon icon={icon} size="xl" />
                    <p>•••• •••• •••• •••• {text}</p>
                </div>
            </div>
            <div className="payment-method__expand">
                <Icon icon="close" />
            </div>
        </div>
    )

}


export default PaymentMethod;