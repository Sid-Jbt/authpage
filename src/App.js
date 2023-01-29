import { useSelector } from 'react-redux';
import theme from 'Theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import Snackbar from 'Elements/Snackbar';
import { Check } from '@mui/icons-material';
import RootRoutes from './Routes/index';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const { pathname } = useLocation();
  const [openSB, setOpenSB] = useState(false);
  const handleOpenSB = () => setOpenSB(true);
  const handleCloseSB = () => setOpenSB(false);

  useEffect(() => {
    if (customization.snackbarData) {
      handleOpenSB();
    }
  }, [customization]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <RootRoutes name="app" path="/" handler={App} />
        <Snackbar
          color="success"
          icon={<Check color="success" />}
          title="Testing Title"
          content="Hello, world! This is a notification message"
          dateTime="11 mins ago"
          open={openSB}
          onClose={handleCloseSB}
          close={handleCloseSB}
          bgWhite
        />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
