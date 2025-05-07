
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css'; // Import global styles
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';

// Create a Material 3 theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#006adc',
    },
    secondary: {
      main: '#535f70',
    },
    background: {
      default: '#fdfbff',
      paper: '#fff',
    },
  },
  shape: {
    borderRadius: 16,
  },
  typography: {
    fontFamily: [
      'Inter',
      'system-ui',
      'sans-serif',
    ].join(','),
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);