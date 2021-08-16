import React from 'react';


const Textarea = ({ id, label, placeholder, value, onChange }) => {

    return (
        <div className="textarea animate-item">
            <label htmlFor={id}>{label}</label>
            <textarea
                id={id}
                value={value}
                placeholder={placeholder}
                onChange={({ target }) => onChange(target.value)}
            />
        </div>
    )

}

export default Textarea;