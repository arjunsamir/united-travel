import React from 'react';

// Import Dependencies
import { DatePicker as MaterialDatePicker, TimePicker as MaterialTimePicker } from '@material-ui/pickers';
import Icon from './Icon';

// Import Hooks
import { useObjectState } from '../helpers/hooks';


const TextFieldComponent = (label, placeholder, showPlaceholder) => {
    
    return ({ value, onClick }) => (
        <div className="input__field clickable" onClick={onClick}>
            {label && <label>{label}</label>}
            <p>{showPlaceholder ? placeholder : value}</p>
        </div>
    );
}


const DatePicker = ({ date, label, placeholder, onChange, customProps, isSet }) => {
    return (
        <MaterialDatePicker
            value={date}
            animateYearScrolling
            disablePast
            onChange
            format="MMM D, YYYY"
            onChange={onChange}
            { ...(customProps || {}) }
            TextFieldComponent={TextFieldComponent(label, placeholder, !isSet)}
        />
    )
}


const TimePicker = ({ time, label, placeholder, onChange, customProps, isSet }) => {
    return (
        <MaterialTimePicker
            autoOk
            value={time}
            onChange={onChange}
            minutesStep={5}
            { ...(customProps || {}) }
            TextFieldComponent={TextFieldComponent(label, placeholder, !isSet)}
        />
    )
}


// Create Component
const DateTimePicker = ({ value, defaultValue, onChange, onStatusChange, datePicker, timePicker, icon }) => {

    // Configure Local State
    const [isSet, setIsSet] = useObjectState({
        date: !datePicker,
        time: !timePicker,
        all: false
    });

    const handleChange = (field) => {
        return (val) => {

            // Update Placeholder State
            if (!isSet[field]) setIsSet({[field]: true });

            // Check if all validated
            if (!isSet.all) setIsSet({ all: isSet.date && isSet.time });

            // Update Validation
            if (onStatusChange) onStatusChange({ ...isSet });

            // Handle Change
            onChange(val.toString());

        }
    }

    const initialDate = defaultValue || new Date().setHours(12, 0, 0, 0);
    const date = value || initialDate;

    return (
        <div className="input">
            <div className="input__input">
                <div className="input__main">
                    {icon && (
                        <>
                            <Icon icon={typeof icon === 'string' ? icon : "clock"} size="lg" />
                            <hr />
                        </>
                    )}
                    {datePicker && typeof datePicker === 'object' && (
                        <DatePicker
                            date={date}
                            onChange={handleChange('date')}
                            isSet={isSet.date}
                            { ...(datePicker || {}) }
                        />
                    )}
                    {datePicker && timePicker && <hr />}
                    {timePicker && typeof timePicker === 'object' && (
                        <TimePicker
                            time={date}
                            onChange={handleChange('time')}
                            isSet={isSet.time}
                            { ...(timePicker || {}) }
                        />
                    )}
                </div>
            </div>
            <div className="input__errors"></div>
        </div>
    )

}

export default DateTimePicker;