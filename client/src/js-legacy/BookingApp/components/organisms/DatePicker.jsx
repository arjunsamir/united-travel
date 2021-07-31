// Import React
import React from 'react';

// Import Libraries
import { ThemeProvider } from "@material-ui/styles";

// Import Atoms
import DateTimeText, { DateTimeDefault } from '../atoms/DateTimeText'

// Import Molecules
import Field from '../molecules/Field'

// Import Organisms
import { DatePicker as MaterialDatePicker } from "@material-ui/pickers";

// Import Theme
import { unitedTravelTheme as theme } from '../../data/themes';

const DatePicker = ({ date, initialDate, onChange, disablePast, label, grow, format }) => {

    return (

        <Field label={label} grow={grow}>
            <ThemeProvider theme={theme}>
                <MaterialDatePicker
                    value={date || initialDate}
                    onChange={onChange}
                    animateYearScrolling
                    disablePast={disablePast ?? true}
                    format={format ?? "MMMM D, YYYY"}
                    TextFieldComponent={date ? DateTimeText : DateTimeDefault}
                />
            </ThemeProvider>
        </Field>
    )

}

export default DatePicker;
