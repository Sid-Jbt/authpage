function navbar(theme) {
  const { palette, functions, transitions, breakpoints, borders } = theme;

  const { text, transparent } = palette;
  const { pxToRem } = functions;
  const { borderRadius } = borders;

  return {
    boxShadow: 'none',
    backgroundColor: `${transparent.main} !important`,
    color: text.main,
    top: pxToRem(12),
    minHeight: pxToRem(75),
    display: 'grid',
    alignItems: 'center',
    borderRadius: borderRadius.xl,
    paddingTop: pxToRem(8),
    paddingBottom: pxToRem(8),
    paddingRight: 0,
    paddingLeft: 0,
    '& > *': {
      transition: transitions.create('all', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard
      })
    },

    '& .MuiToolbar-root': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      [breakpoints.up('sm')]: {
        minHeight: 'auto',
        padding: `${pxToRem(4)} ${pxToRem(16)}`
      }
    }
  };
}

const navbarContainer = ({ breakpoints }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  p: '0 !important',
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

export { navbar, navbarContainer, navbarRow, navbarIconButton, navbarMobileMenu };
