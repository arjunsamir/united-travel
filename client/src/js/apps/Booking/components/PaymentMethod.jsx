import React from 'react';

import Icon from '../../components/Icon';

const PaymentMethod = ({ onClick, label, icon, type, selected, text, isCard, isMainBtn }) => {

    return (
        <div className="payment-method" onClick={onClick}>
            <div className="payment-method__info">
                {label && <h6 className="bold">{label}</h6>}
                <div>
                    {type === 'button' || isMainBtn ? (
                        <Icon icon="plus" />
                    ) : (
                        <Icon icon={icon} size="xl" />
                    )}
                    <p>{isCard && "•••• •••• •••• •••• "}{text}</p>
                </div>
            </div>
            <div className="payment-method__expand">
                {type === 'option' && selected && <Icon icon="checkmark" />}
                {type === 'main' && <Icon icon="more" size="xl" />}
            </div>
        </div>
    )
    
}

export default PaymentMethod;