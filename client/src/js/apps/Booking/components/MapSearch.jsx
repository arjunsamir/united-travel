import React, { useContext, useMemo, useEffect, useState, useRef } from 'react';
import AppContext from '../store/context';

// Import Components
import Autocomplete from '../../components/Autocomplete';
import Icon from '../../components/Icon';


// Import Utilities
import throttle from 'lodash/throttle';
import parse from 'autosuggest-highlight/parse';


// Icon Types
const icons = {
    airport: 'airplane',
    bus_station: 'bus',
    transit_station: 'train',
    lodging: 'bed',
    bar: 'wine',
    meal_takeaway: 'restaurant',
    restaurant: 'restaurant',
    default: 'location-pin'
}


// Create Search Input
const createSearchInput = ({ label, placeholder }) => {

    return ({ inputProps: props, InputProps: { ref } }) => {
        return (
            <div className="location-search__field" ref={ref}>
                <label htmlFor={props.id}>{label}</label>
                <input
                    {...props}
                    type="text"
                    className={$.join("location-search__input", props.className)}
                    placeholder={placeholder}
                />
            </div>
        );
    }

};


const StaticField = ({ value, label }) => {
    return (
        <div className="location-search__field static">
            <label>{label}</label>
            <div><p>{value}</p></div>
        </div>
    )
}


// Render Custom Option
const CustomOption = (option) => {

    const matches = option.structured_formatting.main_text_matched_substrings;
    const parts = parse(
        option.structured_formatting.main_text,
        matches.map((match) => [match.offset, match.offset + match.length])
    );

    return (
        <div className="autocomplete-item">
            <Icon icon={icons[option.types[0]] || icons.default} size="md" />
            <div className="autocomplete-item__location">
                <h6 className="bold">{parts.map(({ highlight, text }, i) => (
                    <span key={i} className={$.join([highlight, "highlight"])}>
                        {text}
                    </span>
                ))}</h6>
                <p>{option.structured_formatting.secondary_text}</p>
            </div>
            
        </div>
    )

}


// Render Autocomplete Field
const Field = ({ id, label, placeholder, value, onChange, fallbackCopy, initialInputValue }) => {

    // Get State
    const { state } = useContext(AppContext);
    const { map } = state.app;


    // Create Local State
    const [inputValue, setInputValue] = useState(initialInputValue)
    const [options, setOptions] = useState([]);


    // Create Refs
    const latLng = useRef(new google.maps.LatLng(map.data.options.center));


    // Throttle Fetch Requests
    const fetchResults = useMemo(() => throttle((request, callback) => {
        map.autoComplete.getPlacePredictions(request, callback);

    }, 200));

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
            if (value) newOptions = [value];
            if (results) newOptions = [...newOptions, ...results];
            setOptions(newOptions);
        });

        return () => active = false;

    }, [value, inputValue]);

    // Create Input
    return (
        <Autocomplete
            id={id}
            options={options}
            renderInput={createSearchInput({
                label,
                placeholder
            })}
            filterOptions={(places) => places.filter(place => {
                if (!place || typeof place !== 'object') return null;
                if (!place.terms.filter(term => term.value === "FL").length) return null;
                if (place.terms.length <= 3) return null;
                return place
            })}
            onInputChange={(e, val) => setInputValue(val)}
            onChange={(e, val) => {
                setOptions(val ? [val, ...options] : options);
                onChange(val)
            }}
            inputValue={inputValue}
            value={value}
            customProps={{
                getOptionLabel(option) {
                    return (typeof option === 'string' ? option : option.structured_formatting.main_text)
                },
                getOptionSelected(opt, val) {
                    return (opt === val) || (opt?.place_id === val?.place_id)
                },
                autoComplete: true,
                autoHighlight: true,
                filterSelectedOptions: true,
                noOptionsText: fallbackCopy,
                renderOption: CustomOption
            }}
            
        />
    )

};


// Create Main Component
const MapSearch = ({ labels, placeholders, fallbackCopy }) => {

    // Destructure State
    const {
        state: {
            reservation: {
                origin,
                destination,
                serviceType,
                flight,
                cruise
            }
        },
        update
    } = useContext(AppContext);

    const types = {
        airport: flight.type,
        cruise: cruise.type
    };

    let showOrigin = true;
    let showDestination = true;

    if (serviceType === 'airport' || serviceType === 'cruise') {

        const type = types[serviceType];
        if (type === 'departing') showDestination = false;
        if (type === 'arriving') showOrigin = false;

    }

    return (
        <div className="location-search animate-item">
            <div className="location-search__icon">
                <span></span>
                <hr />
                <span></span>
            </div>
            <div className="location-search__main">
                {showOrigin ? (
                    <Field
                        id="origin-search"
                        label={labels.origin}
                        placeholder={placeholders.origin}
                        fallbackCopy={fallbackCopy}
                        value={origin.selected}
                        initialInputValue={origin.name}
                        onChange={(val) => update("ORIGIN", val)}
                    />
                ) : <StaticField value={origin.name} label={labels.origin} />}
                <hr />
                {showDestination ? (
                    <Field
                        id="destination-search"
                        label={labels.destination}
                        placeholder={placeholders.destination}
                        fallbackCopy={fallbackCopy}
                        value={destination.selected}
                        initialInputValue={destination.name}
                        onChange={(val) => update("DESTINATION", val)}
                    />
                ) : <StaticField value={destination.name} label={labels.destination} />}
            </div>
        </div>
    )

};

export default MapSearch;