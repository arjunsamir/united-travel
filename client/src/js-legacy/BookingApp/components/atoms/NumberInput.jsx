import React from 'react';

const NumberInput = ({ min, value, onChange }) => {

    return (
        <input
            type="number"
            placeholder={min}
            min={min || 0}
            value={value}
            onChange={onChange}
            onFocus={e => e.target.select()}
            onClick={e => e.target.select()}
        />
    )

}

export default NumberInput;