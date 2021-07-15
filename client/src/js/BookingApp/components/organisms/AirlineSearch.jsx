// Import React
import React, { useState } from 'react';

// Import Libraries
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { ThemeProvider } from "@material-ui/styles";

// Import Theme
import { unitedTravelTheme as theme } from '../../data/themes';

// Import Atoms
import SearchInput from '../atoms/SearchInput'

// Import Molecules
import Field from '../molecules/Field';

// Define Filter Options
const filterOptions = createFilterOptions({ limit: 5 })

const AirlineSearch = ({ airlines, onChange, value, grow, label, tooltip, showTooltip }) => {
    
    // Helper Functions
    const getOptions = (term) => {

        if (!term || !term.length) return ({
            index: '',
            options: []
        })

        const first = term[0].toLowerCase();

        return ({
            index: first,
            options: airlines[first]
        })

    }

    // Configure Local State
    const [options, setOptions] = useState(getOptions(value ?? ''))

    // On Input Change
    const onInputChange = (e, value) => {

        if (!e) return;

        onChange && onChange(value)

        if (value.length > 1) return;

        const first = value ? value[0].toLowerCase() : '';
        
        if (first !== options.index) setOptions(getOptions(value))

    }

    

    return (
        <Field
            label={label}
            grow={grow}
            tooltip={tooltip}
            showTooltip={showTooltip}
        >
            <ThemeProvider theme={theme}>
                <Autocomplete
                    id="airline-search"
                    options={options.options}
                    freeSolo
                    autoHighlight
                    inputValue={value}
                    onInputChange={onInputChange}
                    filterOptions={filterOptions}
                    renderInput={SearchInput("united")}
                />
            </ThemeProvider>
        </Field>
        
    )

}

export default AirlineSearch;