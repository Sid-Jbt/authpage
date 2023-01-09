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
      // toolbar: {
      //   minHeight: '48px',
      //   padding: '16px',
      //   '@media (min-width: 600px)': {
      //     minHeight: '48px'
      //   }
      // }
    },
    typography: themeTypography(themeOption)
  };

  const themes = createTheme(themeOptions);
  themes.components = componentStyleOverrides(themeOption);

  return themes;
};

export default theme;
