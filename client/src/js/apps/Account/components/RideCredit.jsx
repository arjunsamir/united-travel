import React from 'react';

// Import Helpers
import dayjs from 'dayjs';


const formatValue = (value) => {

    const dollars = value / 100;

    const isInt = dollars === dollars && (dollars % 1 === 0);

    if (isInt) return dollars
    else return dollars.toFixed(2);

}


const getCopy = (status, expiration) => {

    switch (status) {

        case 'valid':
            return `Expires on ${dayjs(expiration).format("MMMM D, YYYY")}`

        case 'expired':
            return `Expired on ${dayjs(expiration).format("MMMM D, YYYY")}`

        case 'pending':
            return "Waiting for the invited user to book a ride"

        default:
            return "";

    }
}


const RideCredit = ({ credit }) => {

    if (!typeof credit === 'object') return null;

    const { value, status, expiration } = credit;

    return (

        <div className={$.join("ride-credit", [status])}>
            <div className="ride-credit__value">
                <h4 className="light white">${formatValue(value)}</h4>
            </div>
            <div className="ride-credit__details">
                <p>{status}</p>
                <p className="small">{getCopy(status, expiration)}</p>
            </div>
        </div>

    )

}


export default RideCredit;