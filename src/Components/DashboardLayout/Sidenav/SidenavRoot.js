import { Drawer, styled } from '@mui/material';

export default styled(Drawer)(({ theme, ownerState }) => {
  const { palette, boxShadows, transitions, breakpoints, functions } = theme;
  const { darkSidenav, miniSidenav } = ownerState;

  const sidebarWidth = 256;
  const { white, transparent } = palette;
  const { xxl } = boxShadows;
  const { pxToRem } = functions;

  const bgColor = white.main;

  const drawerOpenStyles = () => ({
    transform: 'translateX(0)',
    transition: transitions.create('transform', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter
    }),
    [breakpoints.up('xs')]: {
      backgroundColor: bgColor,
      boxShadow: darkSidenav ? 'none' : xxl,
      marginBottom: darkSidenav ? 0 : 'inherit',
      left: '0',
      top: 50,
      width: sidebarWidth,
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    },
    [breakpoints.up('xl')]: {
      backgroundColor: bgColor,
      boxShadow: darkSidenav ? 'none' : xxl,
      marginBottom: darkSidenav ? 0 : 'inherit',
      left: '0',
      width: sidebarWidth,
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.enteringScreen
      })
    }
  });

  const drawerCloseStyles = () => ({
    transform: `translateX(${pxToRem(-320)})`,
    transition: transitions.create('transform', {
      easing: transitions.easing.sharp,
      duration: transitions.duration.shorter
    }),
    [breakpoints.up('xs')]: {
      backgroundColor: bgColor,
      boxShadow: darkSidenav ? 'none' : xxl,
      marginBottom: darkSidenav ? 0 : 'inherit',
      left: '0',
      width: 0,
      top: 50,
      overflowX: 'hidden',
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter
      })
    },
    [breakpoints.up('xl')]: {
      backgroundColor: bgColor,
      boxShadow: darkSidenav ? 'none' : xxl,
      marginBottom: darkSidenav ? 0 : 'inherit',
      left: '0',
      width: pxToRem(96),
      overflowX: 'hidden',
      transform: 'translateX(0)',
      transition: transitions.create(['width', 'background-color'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.shorter
      })
    }
  });

  return {
    '& .MuiDrawer-paper': {
      boxShadow: xxl,
      border: 'none',
      height: 'calc(100vh - 2rem)',
      margin: pxToRem(20),
      borderRadius: pxToRem(8),
      backgroundColor: transparent.main,
      ...(miniSidenav ? drawerCloseStyles() : drawerOpenStyles())
    }
  };
});
