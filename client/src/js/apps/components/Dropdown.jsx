import React, { useState } from 'react';
import Icon from './Icon';


const Dropdown = ({ placeholder, label, errors, onSelect, selected, id, options, customClasses }) => {

    // Configure Local State
    const [changed, setChanged] = useState(false);


    // Attach Placeholder Value
    const items = changed ? options : [{
        value: -1,
        text: placeholder
    }, ...options];


    // Get Currently Selected Value
    const value = (selected && typeof selected === 'object' ? selected.value : selected) || -1;


    // Determine if the Dropdown has errors
    const hasErrors = errors && errors.length > 0;

    // Create Dropdown Component
    return (
        <div className={$.join("dropdown animate-item", [customClasses])}>
            <div className={$.join("dropdown__select", [hasErrors, "has-error"])}>
                <select
                    id={id}
                    value={value}
                    onChange={(e) => {

                        // Destructure Value
                        const { value: val } = e.target;

                        // Disable Clicking Placeholder from chaning state
                        if (val == -1) return;

                        // Note the item has changed
                        if (!changed) setChanged(true);
                        
                        // Update value
                        onSelect && onSelect(items.find(item => item.value == val));
                        
                    }}
                >
                    {items.map(item => (
                        <option key={item.value} value={item.value}>
                            {item.text}
                        </option>
                    ))}
                </select>
                <div className={$.join("dropdown__field", [value === -1, "placeholder"])}>
                    <label htmlFor={id}>{label}</label>
                    <div>
                        <p>{items.find(i => i.value === value)?.text || placeholder}</p>
                    </div>
                </div>
                <Icon icon="expand" />
            </div>
            {hasErrors && (
                <div className="dropdown__errors">
                    {errors.map((err, i) => (
                        <div className="dropdown__error" key={i}>
                            <Icon icon="error" size="sm" />
                            <p className="small bold">{err}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )

};

export default Dropdown;