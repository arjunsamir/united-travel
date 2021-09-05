import React from 'react';
import Switch from '@material-ui/core/Switch'


const Toggle = ({ checked, onChange, name, ariaLabel, label }) => {

    return (
        <div className="toggle animate-children">
            {label && <p className="toggle__label">{label}</p>}
            <div className="toggle__switch">
                <Switch
                    checked={checked}
                    onChange={onChange}
                    name={name}
                    color="primary"
                    inputProps={{ 'aria-label': ariaLabel || 'toggle-checkbox' }}
                />
            </div>
        </div>
    )

};


export default Toggle;