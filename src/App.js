import { useDispatch, useSelector } from 'react-redux';
import theme from 'Theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import SnackbarProvider from 'Context/SnackbarProvider';
import Interceptor from 'APIs';
import { useNavigate } from 'react-router-dom';
import RootRoutes from './Routes/index';
import { getLoginPattern } from './Routes/routeConfig';
import { LOGOUT } from './APIs/constants';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <SnackbarProvider>
          <Interceptor
            onTokenExpire={() => {
              navigate(getLoginPattern());
              dispatch({ type: LOGOUT });
            }}
          >
            <RootRoutes name="app" path="/" handler={App} />
          </Interceptor>
        </SnackbarProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
