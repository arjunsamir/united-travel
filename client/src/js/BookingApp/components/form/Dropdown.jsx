import React from 'react';

const Dropdown = ({options}) => {


    return (
        <div className="dropdown__select">
            <select>
                {}
                {options.map(option => (
                    <option value={option.value} ></option>
                ))}
            </select>
        </div>
    )

}

export default Dropdown;