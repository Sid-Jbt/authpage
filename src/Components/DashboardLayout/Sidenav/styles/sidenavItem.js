function item(theme, ownerState) {
  const { palette, transitions, breakpoints, borders, functions } = theme;
  const { active, miniSidenav } = ownerState;

  const { dark, transparent } = palette;
  const { borderRadius } = borders;
  const { pxToRem, rgba } = functions;

  return {
    background: active ? rgba(palette.info.main, 0.1) : transparent.main,
    color: dark.main,
    display: miniSidenav ? 'block' : 'flex',
    alignItems: 'center',
    width: '100%',
    padding: `${pxToRem(10.8)} ${pxToRem(16)} ${pxToRem(10.8)} ${pxToRem(16)}`,
    margin: `0 ${pxToRem(8)}`,
    borderRadius: borderRadius.md,
    cursor: 'pointer',
    userSelect: 'none',
    whiteSpace: 'nowrap',
    boxShadow: 'none',

    [breakpoints.up('xl')]: {
      boxShadow: 'none',
      transition: transitions.create('box-shadow', {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.shorter
      })
    }
  };
}

function itemIconBox(theme, ownerState) {
  const { transitions, borders, functions } = theme;
  const { darkSidenav, sidenavColor, active } = ownerState;

  const { borderRadius } = borders;
  const { pxToRem } = functions;

  return {
    color: 'inherit',
    minWidth: pxToRem(32),
    minHeight: pxToRem(32),
    borderRadius: borderRadius.md,
    display: 'grid',
    placeItems: 'center',
    transition: transitions.create('margin', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard
    }),

    '& svg, svg g': {
      fill: 'currentColor'
    },

    '& i': {
      color: active && (darkSidenav || sidenavColor) ? 'inherit' : null
    }
  };
}

const itemIcon = ({ palette: { white, gradients } }, { active }) => ({
  color: active ? white.main : gradients.dark.state
});

function itemText(theme, ownerState) {
  const { typography, transitions, breakpoints, functions } = theme;
  const { miniSidenav, active } = ownerState;

  const { size, fontWeightMedium, fontWeightRegular } = typography;
  const { pxToRem } = functions;

  return {
    color: 'inherit',
    marginLeft: pxToRem(4),

    [breakpoints.up('xl')]: {
      opacity: miniSidenav ? 0 : 1,
      maxWidth: miniSidenav ? 0 : '100%',
      marginLeft: miniSidenav ? 0 : pxToRem(4),
      marginBottom: miniSidenav ? 0 : pxToRem(4),
      transition: transitions.create(['opacity', 'margin'], {
        easing: transitions.easing.easeInOut,
        duration: transitions.duration.standard
      })
    },

    '& span': {
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: active ? fontWeightMedium : fontWeightRegular,
      fontSize: size.sm,
      lineHeight: 0
    }
  };
}

export { item, itemIconBox, itemIcon, itemText };