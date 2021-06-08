import React from 'react';

const Option = ({ type, name, title, text, value, checked, onSelect }) => {

    return (
        <label className="select-tile">
            <input 
                type={type || 'radio'} 
                name={name} 
                onChange={onSelect} 
                value={value} 
                checked={checked}
            />
            <div className="select-tile__container">
                <h4 className="select-tile__text">{title}</h4>
                <p className="select-tile__text">{text || ''}</p>
            </div>
        </label>
    )

}

export default Option;