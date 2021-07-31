// Import React
import React from 'react';

// Import Libraries
import { ThemeProvider } from "@material-ui/styles";

// Import Atoms
import DateTimeText, { DateTimeDefault } from '../atoms/DateTimeText'

// Import Molecules
import Field from '../molecules/Field'

// Import Organisms
import { TimePicker as MaterialTimePicker } from "@material-ui/pickers";

// Import Theme
import { unitedTravelTheme as theme } from '../../data/themes';

const DatePicker = ({ time, initialTime, onChange, label, grow }) => {

    return (

        <Field label={label} grow={grow}>
            <ThemeProvider theme={theme}>
                <MaterialTimePicker
                    autoOk
                    value={time || initialTime}
                    TextFieldComponent={time ? DateTimeText : DateTimeDefault}
                    onChange={onChange}
                    minutesStep={5}
                />
            </ThemeProvider>
        </Field>
    )

}

export default DatePicker;
