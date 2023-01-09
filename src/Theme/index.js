import { createTheme } from '@mui/material/styles';
import componentStyleOverrides from './compStyleOverride';
import themeTypography from './typography';
import colors from './colors';

export const theme = (customization) => {
  const color = colors;

  const themeOption = {
    colors: color,
    customization
  };

  const themeOptions = {
    direction: 'ltr',
    palette: themeOption,
    mixins: {
      toolbar: {
        color: 'white',
        padding: '16px'
      }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
