import React from 'react';

// Import Atoms
import Icon from '../atoms/Icon';

// Create Component
const Field = ({ input, label, tooltip, showTooltip }) => {

    return (
        <div className="input__field">
            {input}
            {label && <h6>{label}</h6>}
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