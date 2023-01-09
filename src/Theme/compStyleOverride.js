export default function componentStyleOverrides(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          borderRadius: '10px',
          background: theme.colors.info.main
        }
      }
    }
  };
}
