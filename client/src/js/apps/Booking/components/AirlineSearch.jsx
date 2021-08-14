// Import React Defaults
import React, { useState } from 'react';

// Import Components
import Autocomplete from '../../components/Autocomplete';

// Helper Function To Get 
const getOptions = ({ term, airlines, first: f }) => {

    if (!term || !term.length) return ({
        index: '',
        options: []
    });

    const first = f ?? term[0].toLowerCase();

    return({
        index: first,
        options: airlines[first] || []
    })

}

// Export Component
const AirlineSearch = ({ id, icon, label, placeholder, errors, airlines, onChange }) => {

    const [options, setOptions] = useState(getOptions({ airlines }));

    const onInputChange = (e, term) => {
        if (!e) return;
        if (onChange) onChange(term);
        if (term.length > 1) return;
        const first = term ? term[0].toLowerCase() : '';
        if (first !== options.index) setOptions(getOptions({ first, airlines, term }));
    }

    console.log(options);

    return (
        <Autocomplete
            id={id}
            icon={icon || "airplane"}
            label={label}
            placeholder={placeholder}
            errors={errors}
            options={options.options}
            onInputChange={onInputChange}
            limit={5}
            freeSolo
        />
    );

}

export default AirlineSearch;