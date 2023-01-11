const navbarContainer = ({ breakpoints }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  p: 0,
  [breakpoints.up('md')]: {
    flexDirection: 'row',
    alignItems: 'center',
    p: 0,
    minHeight: 'auto'
  }
});

const navbarRow = ({ breakpoints }, { isMini }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  [breakpoints.up('md')]: {
    justifyContent: isMini ? 'space-between' : 'stretch',
    width: isMini ? '100%' : 'max-content'
  },
  [breakpoints.up('xl')]: {
    justifyContent: 'stretch !important',
    width: 'max-content !important'
  }
});

const navbarIconButton = ({ typography: { size }, breakpoints }) => ({
  px: 0.75,

  '& .material-icons, .material-icons-round': {
    fontSize: `${size.md} !important`
  },

  '& .MuiTypography-root': {
    display: 'none',

    [breakpoints.up('sm')]: {
      display: 'inline-block',
      lineHeight: 1.2,
      ml: 0.5
    }
  }
});

const navbarMobileMenu = ({ breakpoints }) => ({
  display: 'inline-block',
  lineHeight: 0,

  [breakpoints.up('xl')]: {
    display: 'none'
  }
});

export { navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu };
