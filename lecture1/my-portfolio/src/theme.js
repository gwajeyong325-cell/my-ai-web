import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main:  '#111111',
      light: '#444444',
      dark:  '#000000',
    },
    secondary: {
      main:  '#666666',
      light: '#999999',
      dark:  '#333333',
    },
    background: {
      default: '#ffffff',
      paper:   '#fafafa',
    },
    text: {
      primary:   '#111111',
      secondary: '#666666',
      disabled:  '#aaaaaa',
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { fontSize: '2.125rem', fontWeight: 700 },
    h2: { fontSize: '1.5rem',   fontWeight: 600 },
    h3: { fontSize: '1.25rem',  fontWeight: 600 },
    h4: { fontSize: '1.125rem', fontWeight: 500 },
    body1: { fontSize: '1rem',      fontWeight: 400 },
    body2: { fontSize: '0.875rem',  fontWeight: 400 },
  },
  spacing: 8,
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: 'none',
          color: '#111111',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          backgroundColor: '#111111',
          color: '#ffffff',
          fontWeight: 600,
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#000000',
            boxShadow: 'none',
          },
        },
        outlinedPrimary: {
          borderColor: 'rgba(0, 0, 0, 0.25)',
          color: '#111111',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)',
            borderColor: '#111111',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          border: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '0 2px 16px rgba(0, 0, 0, 0.06)',
        },
      },
    },
  },
});

export default theme;
