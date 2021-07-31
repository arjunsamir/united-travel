import React from 'react';


// Import Organisms
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';
import Input from './Input';

const DateTimePicker = ({ date, initialDate, onDateChange }) => {

    return (

        <Input
            icon="calendar"
        >

            <DatePicker
                label="Date"
                grow="2"
                date={date}
                initialDate={initialDate}
                onChange={onDateChange}
                disablePast={true}
            />

            <TimePicker
                label="Time"
                grow="1"
                time={date}
                initialTime={initialDate}
                onChange={onDateChange}
            />
            
        </Input>
    )

}

export default DateTimePicker;
