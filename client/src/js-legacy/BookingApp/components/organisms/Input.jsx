// Import React
import React from 'react';

// Import Atoms
import Icon from '../atoms/Icon'

// Import Molecules
import Field from '../molecules/Field'

// Create Component 
const Input = ({ icon, fields, children }) => {

    return (
        <div className="input">

            {icon && (
                <div className="input__icon">
                    <Icon icon={icon} />
                </div>
            )}

            {fields && fields.map(field => (
                <Field
                    key={field.label}
                    input={field.input}
                    label={field.label}
                    tooltip={field.tooltip}
                />
            ))}

            {children}

        </div>
    )

}

export default Input;