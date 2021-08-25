import React from 'react';
import Icon from './Icon';

const Checkbox = ({ id, label, checked, onChange }) => {

    return (
        <div className="checkbox animate-item">
            <input
                type="checkbox"
                id={id}
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            <label htmlFor={id}>
                <span>
                    {checked && <Icon icon="check" size="xs" />}
                </span>
                <h6>{label}</h6>
            </label>
        </div>
    )

};

export default Checkbox;