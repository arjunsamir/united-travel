import React, { useState } from 'react';

import Icon from './Icon';

const QuantitySelector = ({ label, text, placeholder, value, onChange, id, min, max, errorCopy }) => {

    const [message, setMessage] = useState('');

    const update = (val, increment) => {

        if (!val && val != 0 && !increment) {
            setMessage('');
            return onChange('');
        }

        // Clean and parse Value
        let v = parseInt(val.toString().replace(/[^0-9]/g, ''));

        if (!increment && v !== v) {
            setMessage('');
            return onChange('');
        }
        else if (v !== v) v = min;
        else if (increment) v += increment;

        if (v <= (min || 0)) {
            v = min ?? 0;
            setMessage(errorCopy ? errorCopy.min.replace('{min}', min || 0) : `Must be greater than ${min || 0}`);
        }
        else if (max && v >= max) {
            v = max;
            setMessage(errorCopy ? errorCopy.max.replace('{max}', max) : `Must be less than ${max}`);
        }
        else setMessage('');

        onChange(v);
    }

    return (
        <div className="quantity-selector">
            <div className="quantity-selector__main animate-item">
                <div className="quantity-selector__info">
                    <label htmlFor={id}>{label}</label>
                    <p className="small">{text}</p>
                </div>
                <div className="quantity-selector__field">
                    <div
                        className={$.join([value === (min ?? 0), "disabled"])}
                        onClick={() => update(value, -1)}
                    >
                        <Icon icon="minus" size="xl" />
                    </div>
                    <input
                        id={id}
                        type="number"
                        value={value}
                        placeholder={placeholder}
                        onFocus={e => e.target.select()}
                        onChange={(e) => update(e.target.value)}
                    />
                    <div
                        className={$.join([value === max, "disabled"])}
                        onClick={() => update(value, 1)}
                    >
                        <Icon icon="plus" size="xl" />
                    </div>
                </div>
            </div>
            {message && (
                <div className="input__errors animate-item">
                    <div className="input__warning">
                        <Icon icon="warning" size="sm" />
                        <p className="small bold">{message}</p>
                    </div>
                </div>
            )}
        </div>
    )

}

export default QuantitySelector;