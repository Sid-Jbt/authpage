export default function sidenavLogoLabel(theme, ownerState) {
  const { functions, transitions, typography, breakpoints } = theme;
  const { miniSidenav } = ownerState;

  const { pxToRem } = functions;
  const { fontWeightMedium } = typography;

  return {
    ml: 1,
    width: '100%',
    fontWeight: fontWeightMedium,
    wordSpacing: pxToRem(-1),
    transition: transitions.create('opacity', {
      easing: transitions.easing.easeInOut,
      duration: transitions.duration.standard
    }),

    [breakpoints.up('xl')]: {
      display: miniSidenav ? 'none' : 'block',
      opacity: miniSidenav ? 0 : 1
    }
  };
}
