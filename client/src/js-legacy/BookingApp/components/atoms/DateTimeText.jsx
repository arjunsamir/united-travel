import React from 'react';

// Create Component 
const DateTimeText = ({ value, onClick }) => {

    return (
        <p className="date-time-picker" onClick={onClick}>{value}</p>
    )

}

export const DateTimeDefault = ({ onClick, value }) => {

    return (
        <p className="date-time-picker placeholder" onClick={onClick}>{value}</p>
    )

}

export default DateTimeText;