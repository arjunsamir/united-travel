// Import React
import React from 'react'

// Import Icons
import Icon from '../atoms/Icon';

// Create Carat Button
export const CaratButton = ({ icon, text, children, disabled, order, onClick }) => {

    const btnClasses = ['carat-btn', 'lt-dark', 'dk-light', 'hover-primary'];

    if (disabled) btnClasses.push('disabled')

    return (
        <button className={btnClasses.join(" ")} onClick={onClick}>
            {(!order || order == 'left' || order == 'first') && <Icon icon={icon} />}
            {text && <h6>{text}</h6>}
            {children && children}
            {(order == 'left' || order == 'last') && <Icon icon={icon} />}
        </button>
    )

}

export const Button = ({ text, children }) => {
    return (
        <button>{text ?? children}</button>
    )
}
