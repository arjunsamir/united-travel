import React from 'react';

// Import Helpers
import dayjs from 'dayjs';


const formatValue = (value) => {

    const dollars = value / 100;

    const isInt = dollars === dollars && (dollars % 1 === 0);

    if (isInt) return dollars
    else return dollars.toFixed(2);

}


const RideCredit = ({ credit }) => {

    if (!typeof credit === 'object') return null;

    const { value, status, expiration } = credit;

    return (

        <div className={$.join("ride-credit", [status])}>
            <div className="ride-credit__value">
                <h5 className="light white">${formatValue(value)}</h5>
            </div>
            <div className="ride-credit__details">
                {status === 'valid' && <p>Expires on {dayjs(expiration).format("MMMM D, YYYY")}</p>}
            </div>
        </div>

    )

}


export default RideCredit;