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
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.02em',
          boxShadow: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        sizeLarge: {
          paddingLeft: 40,
          paddingRight: 40,
          paddingTop: 12,
          paddingBottom: 12,
          fontSize: '0.95rem',
        },
        sizeSmall: {
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 5,
          paddingBottom: 5,
          fontSize: '0.78rem',
        },
        containedPrimary: {
          backgroundColor: '#111111',
          color: '#ffffff',
          '&:hover': { backgroundColor: '#000000', boxShadow: 'none' },
          '&.Mui-disabled': { backgroundColor: 'rgba(0,0,0,0.12)', color: 'rgba(0,0,0,0.26)' },
        },
        outlinedPrimary: {
          borderColor: 'rgba(0, 0, 0, 0.25)',
          color: '#111111',
          '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.04)', borderColor: '#111111' },
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
