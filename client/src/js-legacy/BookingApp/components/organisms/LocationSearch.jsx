// Import React Components
import React, { useEffect, useMemo, useState, useRef } from 'react';

// Import Material Components
import Autocomplete from '@material-ui/lab/Autocomplete';
import { ThemeProvider } from "@material-ui/styles";

// Import Atoms
import SearchInput from '../atoms/SearchInput';
import AutocompleteItem from '../atoms/AutocompleteItem';
import Icon from '../atoms/Icon';

// Import Molecules
import Field from '../molecules/Field';

// Import Theme
import { unitedTravelTheme as theme } from '../../data/themes';

// Import Utilities
import throttle from 'lodash/throttle';
import parse from 'autosuggest-highlight/parse';

// Icon Types
const icons = {
    airport: 'airplane',
    bus_station: 'bus',
    transit_station: 'train',
    lodging: 'hotel',
    bar: 'bar',
    meal_takeaway: 'restaurant',
    restaurant: 'restaurant',
    default: 'location'
}


const LocationSearch = ({ id, map, label, value, onChange }) => {

    // Create Local State
    const [inputValue, setInputValue] = useState('')
    const [options, setOptions] = useState([]);

    // Create Refs
    const latLng = useRef(new google.maps.LatLng({ lat: 28.538170419375593, lng: -81.37948338563362 }));

    // Throttle Fetch Requests
    const fetchResults = useMemo(() => throttle((request, callback) => {
        map.services.autoComplete.getPlacePredictions(request, callback)
    }, 200))

    // Get Options
    useEffect(() => {

        let active = true;

        if (!inputValue) {
            setOptions(value ? [value] : []);
            return;
        }

        fetchResults({
            input: inputValue,
            location: latLng.current,
            radius: 420000,
            strictBounds: true
        }, (results) => {
            if (!active) return;

            let newOptions = [];

            if (value) newOptions = [value]

            if (results) newOptions = [...newOptions, ...results];

            setOptions(newOptions)
        })

        return () => active = false;

    }, [value, inputValue, fetch])

    return (
        <Field
            label={label}
            grow="1"
        >
            <ThemeProvider theme={theme}>
                <Autocomplete
                    id={`google-maps-${id}`}
                    filterOptions={(places) => places.filter(place => {
                        if (!place || typeof place !== 'object') return null;
                        if (!place.terms.filter(term => term.value === "FL").length) return null;
                        if (place.terms.length <= 3) return null;
                        return place
                    })}
                    getOptionLabel={(option) => (typeof option === 'string' ? option : option.structured_formatting.main_text)}
                    getOptionSelected={(opt, val) => opt === val || opt?.place_id === val?.place_id}
                    options={options}
                    autoComplete
                    autoHighlight
                    filterSelectedOptions
                    value={value}
                    onChange={(e, val) => {
                        setOptions(val ? [val, ...options] : options);
                        onChange(val)
                    }}
                    noOptionsText="No places found..."
                    onInputChange={(e, val) => setInputValue(val)}
                    renderInput={SearchInput("Search for places")}
                    renderOption={(option) => {
                        const matches = option.structured_formatting.main_text_matched_substrings;
                        const parts = parse(
                        option.structured_formatting.main_text,
                        matches.map((match) => [match.offset, match.offset + match.length]),
                        );

                        return (
                            <AutocompleteItem>
                                <Icon icon={icons[option.types[0]] || icons.default} />
                                <div className="autocomplete-item__location">
                                    <h4>
                                        {parts.map(({highlight, text}, i) => (
                                            <span key={i} className={highlight ? "highlight" : null}>
                                                {text}
                                            </span>
                                        ))}
                                    </h4>
                                    <p>{option.structured_formatting.secondary_text}</p>
                                </div>
                                
                            </AutocompleteItem>
                        )
                    }}
                />
            </ThemeProvider>
        </Field>
    )

}

export default LocationSearch;