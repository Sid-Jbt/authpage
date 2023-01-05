import { CssBaseline, ThemeProvider } from '@material-ui/core';
import theme from './assets/theme';
import logo from './jbt-colored-logo.png';

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className="`App">
      <h2>Welcome to JBT Timer Web Page...</h2>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  </ThemeProvider>
);
export default App;
