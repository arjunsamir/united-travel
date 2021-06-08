import React from 'react';

const Option = ({ type, title, text, name, value, checked, onSelect }) => {

    return (
        <label className="select-tile">
            <input 
                type={type} 
                name={name} 
                onChange={onSelect} 
                defaultValue={value} 
                checked={checked}
            />
            <div className="select-tile__container">
                <h4 className="select-tile__title">{title}</h4>
                <p className="select-tile__text">{text || ''}</p>
            </div>
        </label>
    )

}

export default Option;
