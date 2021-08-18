import React, { useState } from 'react';

// Import Dependencies
import { DatePicker as MaterialDatePicker, TimePicker as MaterialTimePicker } from '@material-ui/pickers';
import Icon from './Icon';

import dayjs from 'dayjs';


const TextFieldComponent = (label, placeholder, showPlaceholder) => {
    
    return ({ value, onClick }) => (
        <div className="input__field clickable" onClick={onClick}>
            {label && <label>{label}</label>}
            <p className={$.join("input__date-time-p", [showPlaceholder, "placeholder"])}>{showPlaceholder ? placeholder : value}</p>
        </div>
    );
}


const DatePicker = ({ date, label, placeholder, onChange, customProps, showPlaceholder, minDate }) => {
    return (
        <MaterialDatePicker
            value={date}
            animateYearScrolling
            disablePast
            onChange
            format="MMM D, YYYY"
            onChange={onChange}
            minDate={minDate}
            { ...(customProps || {}) }
            TextFieldComponent={TextFieldComponent(label, placeholder, showPlaceholder)}
        />
    )
}


const TimePicker = ({ time, label, placeholder, onChange, customProps, showPlaceholder }) => {
    return (
        <MaterialTimePicker
            autoOk
            value={time}
            onChange={onChange}
            minutesStep={5}
            format="h:mm A"
            { ...(customProps || {}) }
            TextFieldComponent={TextFieldComponent(label, placeholder, showPlaceholder)}
        />
    )
}


// Create Component
const DateTimePicker = ({ value, defaultValue, onChange, datePicker, timePicker, icon }) => {

    const handleChange = (val) => {
        // onChange(val.format('YYYY-MM-DDTHH:mm'));
        onChange(val.format('MM-DD-YYYY H:mm'));
        setShow(false);
    }

    const initialDate = defaultValue || dayjs().add(1, 'days').set('hour', 12).set('minute', 0).set('second', 0);
    const date = value ? dayjs(value) : initialDate;

    const [show, setShow] = useState(!value);

    return (
        <div className="input animate-item">
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
                            onChange={handleChange}
                            showPlaceholder={show}
                            minDate={dayjs().add(1, 'day')}
                            { ...(datePicker || {}) }
                        />
                    )}
                    {datePicker && timePicker && <hr />}
                    {timePicker && typeof timePicker === 'object' && (
                        <TimePicker
                            time={date}
                            onChange={handleChange}
                            showPlaceholder={show}
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