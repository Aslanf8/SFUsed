'use client';

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#8C1D40', // SFU Red
    },
    secondary: {
      main: '#C1A01E', // SFU Gold
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
  },
});

export default theme;