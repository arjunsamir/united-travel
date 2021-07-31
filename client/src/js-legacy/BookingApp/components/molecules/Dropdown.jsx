// Import React
import React from 'react';

// Import Atoms
import Icon from '../atoms/Icon'

// Create Dropdown Component
const Dropdown = (props) => {

    const { defaultItem, onSelect, selected } = props;
    const defaultKey = 'default-item-value';

    const items = defaultItem ? [{
        value: defaultKey,
        text: defaultItem
    }, ...props.items] : props.items


    return (
        <div className="dropdown">
            <select
                className="dropdown__select"
                value={selected ? selected.value : items[0]}
                onChange={(e) => {

                    if (defaultItem && e.target.value === defaultKey) return null;

                    onSelect && onSelect(items.find(item => item.value == e.target.value))

                }}
            >
                {items.map(item => (
                    <option
                        key={item.value}
                        value={item.value}
                    >
                        {item.text}
                    </option>
                ))}
            </select>
            <Icon icon="carat-right" />
        </div>
    )

}

export default Dropdown;