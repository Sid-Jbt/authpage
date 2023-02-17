import { createTheme } from '@mui/material/styles';
import colors from './base/colors';
import breakpoints from './base/breakpoints';
import typography from './base/typography';
import boxShadows from './base/boxShadows';
import borders from './base/borders';
import boxShadow from './functions/boxShadow';
import hexToRgb from './functions/hexToRgb';
import linearGradient from './functions/linearGradient';
import pxToRem from './functions/pxToRem';
import rgba from './functions/rgba';
import componentStyleOverrides from './compStyleOverride';

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
  themes.components = componentStyleOverrides(themeOptions);

  return themes;
};

export default theme;
