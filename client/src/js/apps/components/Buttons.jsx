import React from 'react';

import Icon from './Icon';

const a = 'animate-item';


export const BackButton = ({ onClick, text, animationClass, type }) => {

    return (
        <button
            type={type || "button"}
            className={$.join("back-button", animationClass || a)} onClick={onClick}
        >
            <Icon icon="arrow-back" size="sm" />
            <p className="bold">{text || "Back"}</p>
        </button>
    )

}


export const Button = ({ onClick, text, icon, theme, domRef, type, disabled, animationClass, showLoader }) => {

    return (
        <button
            className={$.join("button", [theme], [icon, "with-icon"], [disabled, "disabled"], animationClass || a)}
            onClick={onClick}
            ref={domRef}
            type={type || "button"}
        >
            {icon && (
                <>
                    <Icon icon={icon} />
                    <hr />
                </>
            )}
            <p className="bold">{text}</p>
            {showLoader && (
                <p className="button__loader">
                    <span></span>
                    <span></span>
                    <span></span>
                </p>
            )}
        </button>
    )

}


export const IconButton = ({ onClick, icon, color, animationClass, domRef }) => {

    return (
        <button className={$.join("icon-button", animationClass || a)} onClick={onClick} ref={domRef}>
            <Icon icon={icon} color={color} />
        </button>
    )

}


export const LinkButton = ({ onClick, href, text, domRef, disabled, animationClass, cssClasses }) => {

    return (
        <a
            href={href}
            className={$.join("link-button", animationClass || a, [disabled, "disabled"], [cssClasses])}
            ref={domRef}
            onClick={onClick}
        >
            {text}
        </a>
    )

}