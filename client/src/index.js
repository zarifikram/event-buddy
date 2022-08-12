import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import HomePage from './components/HomePage';
import App from './App';
import { createTheme, StyledEngineProvider, ThemeProvider } from '@mui/material';
const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme(
  {
    palette: {
      primary: {
        main: "#854d0e",
      },
      secondary: {
        main: "#00ff00",
      }
    }

  }
)
root.render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ThemeProvider>
);

