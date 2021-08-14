import React from 'react';

import MaterialAutoComplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import Icon from './Icon';

const createInput = ({ icon, label, placeholder }) => {

    return ({ inputProps: props, InputProps: { ref } }) => {

        return (
            <div className="input__input" ref={ref}>
                <div className="input__main">
                    {icon && (
                        <>
                            <Icon icon={icon} size="lg" />
                            <hr />
                        </>
                    )}
                    <div className="input__field">
                        <label htmlFor={props.id}>{label}</label>
                        <input
                            { ...props }
                            type="text"
                            className={$.join("input__text-input", props.className)}
                            placeholder={placeholder}
                        />
                    </div>
                </div>
                
            </div>
        )

    }

}


// Create Component
const Autocomplete = ({ id, icon, label, placeholder, errors, options, onChange, onInputChange, customProps, value, freeSolo, limit }) => {

    return (
        <div className="input animate-item">
            <MaterialAutoComplete
                id={id}
                options={options}
                renderInput={createInput({ label, placeholder, icon })}
                onChange={onChange}
                onInputChange={onInputChange}
                value={value}
                freeSolo={freeSolo}
                filterOptions={createFilterOptions({ limit })}
                { ...(customProps || {}) }
            />
            {errors && errors.length > 0 && (
                <div className="input__errors">
                    {errors.map((err, i) => (
                        <div className="input__error" key={i}>
                            <Icon icon="error" size="sm" />
                            <p className="small bold">{err}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
    );
};

export default Autocomplete;