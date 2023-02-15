import { useSelector } from 'react-redux';
import theme from 'Theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import SnackbarProvider from 'Context/SnackbarProvider';
import RootRoutes from './Routes/index';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <SnackbarProvider>
          <RootRoutes name="app" path="/" handler={App} />
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
