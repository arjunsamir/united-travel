import React from 'react';

import Tile from '../atoms/Tile'

const Select = (props) => {

    const { type, options, name, onChange } = props;
    const selected = props.selected ?? [];

    return (
        <div className="booking-card__options">
            {options && options.map(opt => (
                <Tile
                    key={opt.value}
                    type={type}
                    title={opt.title}
                    text={opt.text}
                    img={opt.img}
                    name={name}
                    value={opt.value}
                    checked={selected.findIndex(sel => sel.value === opt.value) >= 0 ?? false}
                    onSelect={(e) => {

                        if (!onChange) return;

                        if (type === 'radio') return onChange(opt);

                        const cleaned = selected.filter(sel => sel.value !== opt.value);
                        if (e.target.checked) cleaned.push(opt)
                        onChange([ ...cleaned ]);

                    }}
                />
            ))}
        </div>
    )

}

export default Select;
