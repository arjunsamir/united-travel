import React from 'react';

const Icon = ({ icon, size, color }) => {

    let classes = 'icon-md';
    let style = {};

    if (size) {
        if (typeof size === 'string') classes = `icon-${size}`;
        if (size && typeof size === 'number') style = {
            height: size + 'rem',
            width: size + 'rem'
        };
    }

    if (color) {
        if (color.startsWith('#') || color.startsWith('rgb') || color.startsWith('var')) style.color = color;
        else classes += ` ${color}`;
    }

    return (
        <svg className={classes} style={style}>
            <use href={`/img/icons.svg#${icon}`}></use>
        </svg>
    )

}

export default Icon;