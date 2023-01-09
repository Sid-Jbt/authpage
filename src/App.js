import { useSelector } from 'react-redux';
import theme from 'Theme';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import RootRoutes from './Routes/index';

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme(customization)}>
        <CssBaseline />
        <RootRoutes name="app" path="/" handler={App} />
      </ThemeProvider>
    </StyledEngineProvider>
  );
};
export default App;
