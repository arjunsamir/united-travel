import React from 'react';

// Import Components
import Icon from '../../components/Icon';
import { getBrand as getFullBrand } from '../../helpers/cardBrands';


const PaymentMethod = ({ onClick, card }) => {

    const { brand, digits, expiration: { month, year } } = card;

    return (
        <div className="payment-method no-pointer animate-item">
            <div className="payment-method__info">
                <h6 className="bold">{getFullBrand(brand)} {digits}</h6>
                <div>
                    <Icon icon={brand} size="xl" />
                    <p className="small">Expires {month}/{year}</p>
                </div>
            </div>
            <div className="payment-method__expand" onClick={onClick}>
                <Icon icon="close" />
            </div>
        </div>
    )

}


export default PaymentMethod;