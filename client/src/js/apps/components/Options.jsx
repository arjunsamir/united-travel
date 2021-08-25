import React from 'react';

// Import Components
import Icon from './Icon';

const Option = ({ animationClass, name, id, type, onChange, selected, icon, label, value, }) => {

    return (
        <div className={$.join("option", animationClass || "animate-item", [selected, "selected"])}>
            <input
                type={type || "radio"}
                name={name}
                style={{"display": "none"}}
                value={value}
                checked={selected}
                onChange={onChange && ((e) => onChange(e.target.checked, e.target.value))}
                id={id}
            />
            <label htmlFor={id}>
                {icon && <Icon icon={icon} size="xl" />}
                {label && <p className="small bold">{label}</p>}
            </label>
        </div>
    )

}


const Options = ({ options, name, columns, selected, onChange }) => {

    return (
        <div
            className="options"
            style={{
                gridTemplateColumns: `repeat(${columns || options.length}, 1fr)`,
            }}
        >
            {options.map((option, index) => (
                <Option
                    key={index}
                    name={name}
                    id={`${name}-${index}`}
                    onChange={onChange}
                    selected={selected === option.value}
                    {...option}
                />
            ))}
        </div>
    )

}

export default Options;