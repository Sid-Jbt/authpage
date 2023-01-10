import { createTheme } from '@mui/material/styles';
import colors from './colors';
import breakpoints from './breakpoints';
import typography from './typography';
import boxShadows from './boxShadows';
import borders from './borders';
import boxShadow from './functions/boxShadow';
import hexToRgb from './functions/hexToRgb';
import linearGradient from './functions/linearGradient';
import pxToRem from './functions/pxToRem';
import rgba from './functions/rgba';

export const theme = (customization) => {
  const themeOptions = {
    breakpoints: { ...breakpoints },
    palette: { ...colors },
    typography: { ...typography },
    boxShadows: { ...boxShadows },
    borders: { ...borders },
    functions: {
      boxShadow,
      hexToRgb,
      linearGradient,
      pxToRem,
      rgba
    },
    customization
  };

  const themes = createTheme(themeOptions);
  return themes;
};

export default theme;
