// lib/theme.ts
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
          textTransform: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 3px 5px 2px rgba(140, 29, 64, .3)',
        },
      },
    },
  },
});

export default theme;