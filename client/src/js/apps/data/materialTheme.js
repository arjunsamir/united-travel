import { createMuiTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';

const unitedTravelTheme = createMuiTheme({
    palette: {
        primary: amber,
    },
    typography: {
        htmlFontSize: 10,
        fontFamily: "'Silka', Arial, Helvetica, sans-serif"
    },
    shape: {
        borderRadius: '1.2rem',
    }
});

export default unitedTravelTheme;