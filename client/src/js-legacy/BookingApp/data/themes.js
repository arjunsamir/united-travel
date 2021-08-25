import { createMuiTheme } from '@material-ui/core';
import amber from '@material-ui/core/colors/amber';

export const unitedTravelTheme = createMuiTheme({
    palette: {
        primary: amber,
    },
    typography: {
        htmlFontSize: 10,
        fontFamily: "'Geomanist', Arial, Helvetica, sans-serif"
    },
    shape: {
        borderRadius: 0,
    }
})