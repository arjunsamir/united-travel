import React from 'react';

const Icon = ({ icon }) => {

    return (
        <svg>
            <use href={`/img/icons.svg#${icon}`}></use>
        </svg>
    )

}

export default Icon;
