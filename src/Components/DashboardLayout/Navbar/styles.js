function navbar(theme, ownerState) {
  const { palette, functions, transitions, breakpoints, boxShadows } = theme;
  const { text, transparent, dark, white } = palette;
  const { pxToRem, rgba } = functions;
  const { navbarBoxShadow } = boxShadows;
  const { transparentNavbar } = ownerState;

  return {
    boxShadow: !transparentNavbar ? 'none' : navbarBoxShadow,
    backgroundColor: !transparentNavbar ? `${transparent.main} !important` : rgba(white.main, 0.5),
    backdropFilter: transparentNavbar ? 'blur(20px)' : 'blur(0px)',
    color: () => {
      let color;

      if (transparentNavbar) {
        color = text.main;
      } else {
        color = dark.main;
      }

      return color;
    },
    top: 20,
    minHeight: pxToRem(90),
    width: 'auto',
    display: 'grid',
    alignItems: 'center',
    marginBottom: pxToRem(8),
    marginRight: 3,
    marginLeft: 3,
    paddingRight: 1,
    borderRadius: 4,
    [breakpoints.down('lg')]: {
      top: 0,
      marginRight: 0,
      marginLeft: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0
    },
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
  flexDirection: 'row',
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
  [breakpoints.down('xl')]: {
    justifyContent: isMini ? 'flex-end' : 'stretch',
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
    fontSize: `${size.xs} !important`
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
