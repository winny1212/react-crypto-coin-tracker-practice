import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

const primaryColor = blueGrey[900];

const theme = createTheme({
  palette: {
    primary: primaryColor,
  },
});

export default theme;
