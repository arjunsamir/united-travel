import React from 'react';

// Import Atoms
import Icon from '../atoms/Icon';

// Create Component
const Field = ({ children, input, label, tooltip, showTooltip, grow, id, onBlur }) => {

    return (
        <div className="input__field" onBlur={onBlur} style={grow && { flexGrow: grow }}>
            {input || children}
            {label && <label id={id && `${id}-label`} htmlFor={id}>{label}</label>}
            {tooltip && (
                <div className={`input__tooltip${showTooltip ? '' : ' hidden'}`}>
                    <p>{tooltip}</p>
                </div>
            )}
            <Icon icon="close" />
        </div>
    )

}

export default Field